* SPSS syntax. Open student_model_vars.sav first (File > Open > Data), then run this file.
* ถ้าจะรันจากไฟล์ ให้แก้ path ด้านล่างให้ตรงกับเครื่อง.
* GET FILE='C:\Users\sirav\Code\Note\My_Vault\AIOS\03 Projects\inUni project\DAproject\student_model_vars.sav'.

DESCRIPTIVES VARIABLES=academic_performance study_hours_per_day stress_level sleep_hours physical_activity screen_time
  /STATISTICS=MEAN STDDEV MIN MAX SKEWNESS.

FREQUENCIES VARIABLES=academic_performance study_hours_per_day stress_level sleep_hours physical_activity screen_time
  /FORMAT=NOTABLE
  /NTILES=4
  /STATISTICS=MEDIAN.

CORRELATIONS
  /VARIABLES=academic_performance study_hours_per_day stress_level sleep_hours physical_activity screen_time
  /PRINT=TWOTAIL NOSIG.

REGRESSION
  /DESCRIPTIVES MEAN STDDEV CORR SIG N
  /MISSING LISTWISE
  /STATISTICS COEFF OUTS CI(95) R ANOVA COLLIN TOL
  /CRITERIA=PIN(.05) POUT(.10)
  /NOORIGIN
  /DEPENDENT academic_performance
  /METHOD=ENTER study_hours_per_day stress_level sleep_hours physical_activity screen_time
  /SCATTERPLOT=(*ZRESID ,*ZPRED)
  /RESIDUALS DURBIN NORMPROB(ZRESID)
  /SAVE ZRESID.

* Partial F-test: add the 4 other predictors after study hours (R squared change).
REGRESSION
  /MISSING LISTWISE
  /STATISTICS COEFF OUTS R ANOVA CHANGE
  /NOORIGIN
  /DEPENDENT academic_performance
  /METHOD=ENTER study_hours_per_day
  /METHOD=ENTER stress_level sleep_hours physical_activity screen_time.
