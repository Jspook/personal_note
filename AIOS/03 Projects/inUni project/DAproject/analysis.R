# ============================================================
# Hypothesis test: lifestyle + mental-health factors -> academic performance
# H0: b_study = b_stress = b_sleep = b_activity = b_screen = 0
# Method: multiple linear regression, overall F-test (+ t-test per predictor)
# Run:  Rscript scratch/analysis.R   (working dir = DAproject)
# ============================================================
suppressPackageStartupMessages({library(car); library(lmtest); library(jsonlite); library(ggplot2); library(haven)})

df <- read.csv("student.csv", row.names = 1)
y  <- "academic_performance"
xs <- c("study_hours_per_day", "stress_level", "sleep_hours", "physical_activity", "screen_time")
d  <- df[, c(y, xs)]
stopifnot(sum(is.na(d)) == 0)

# ---- descriptive statistics ----
desc <- t(sapply(d, function(v) c(n = length(v), mean = mean(v), sd = sd(v), min = min(v),
        q1 = quantile(v, .25, names = FALSE), median = median(v), q3 = quantile(v, .75, names = FALSE),
        max = max(v), skew = mean((v - mean(v))^3) / (mean((v - mean(v))^2))^1.5)))
print(round(desc, 4))

# ---- model ----
m  <- lm(academic_performance ~ study_hours_per_day + stress_level + sleep_hours +
           physical_activity + screen_time, data = d)
s  <- summary(m)
print(s)
a0 <- anova(lm(academic_performance ~ 1, d), m)    # overall F-test (full vs intercept-only)
print(a0)
ci <- confint(m)
print(ci)
v  <- vif(m)
print(v)

# standardised beta
zb <- coef(lm(scale(academic_performance) ~ scale(study_hours_per_day) + scale(stress_level) +
              scale(sleep_hours) + scale(physical_activity) + scale(screen_time), d))[-1]

# ---- diagnostics ----
set.seed(2026)
sh <- shapiro.test(sample(resid(m), 5000))
bp <- bptest(m)
dw <- dwtest(m)
cat("Shapiro (n=5000 sample): W =", sh$statistic, " p =", sh$p.value, "\n")
cat("Breusch-Pagan: BP =", bp$statistic, " p =", bp$p.value, "\n")
cat("Durbin-Watson: DW =", dw$statistic, "\n")
cat("skew(resid) =", mean(resid(m)^3) / mean(resid(m)^2)^1.5,
    " excess kurt =", mean(resid(m)^4) / mean(resid(m)^2)^2 - 3, "\n")

# ---- reduced models: contribution of each predictor (partial F = t^2) & block tests ----
drop1_tab <- drop1(m, test = "F")
print(drop1_tab)
mr <- lm(academic_performance ~ study_hours_per_day, d)       # study hours only
a1 <- anova(mr, m)                                             # do the 4 other factors add anything?
print(a1)

# ---- figures ----
dir.create("attachments", showWarnings = FALSE)
th <- theme_minimal(base_size = 12)
p1 <- ggplot(d, aes(academic_performance)) + geom_histogram(bins = 50, fill = "#4C78A8", colour = "white") +
  labs(title = "Distribution of academic_performance", x = "academic_performance", y = "count") + th
ggsave("attachments/fig1_hist_performance.png", p1, width = 6.5, height = 4, dpi = 150)

long <- do.call(rbind, lapply(xs, function(v) data.frame(x = d[[v]], y = d[[y]], var = v)))
long$var <- factor(long$var, levels = xs)
p2 <- ggplot(long, aes(x, y)) + geom_point(alpha = .03, size = .5) +
  geom_smooth(method = "lm", colour = "#E45756", se = FALSE, formula = y ~ x) +
  facet_wrap(~var, scales = "free_x") + labs(title = "academic_performance vs each predictor", x = NULL, y = y) + th
ggsave("attachments/fig2_scatter_predictors.png", p2, width = 9, height = 5.5, dpi = 150)

cf <- data.frame(term = xs, est = coef(m)[xs], lo = ci[xs, 1], hi = ci[xs, 2])
p3 <- ggplot(cf, aes(est, reorder(term, est))) + geom_vline(xintercept = 0, linetype = 2) +
  geom_pointrange(aes(xmin = lo, xmax = hi), colour = "#4C78A8") +
  labs(title = "Regression coefficients with 95% CI", x = "coefficient (points of academic_performance per 1 unit)", y = NULL) + th
ggsave("attachments/fig3_coef_ci.png", p3, width = 7, height = 3.6, dpi = 150)

p4 <- ggplot(data.frame(fit = fitted(m), res = resid(m)), aes(fit, res)) + geom_point(alpha = .05, size = .5) +
  geom_hline(yintercept = 0, colour = "#E45756") + labs(title = "Residuals vs fitted", x = "fitted", y = "residual") + th
ggsave("attachments/fig4_resid_fitted.png", p4, width = 6.5, height = 4, dpi = 150)

p5 <- ggplot(data.frame(r = resid(m)), aes(sample = r)) + stat_qq(size = .4, alpha = .3) + stat_qq_line(colour = "#E45756") +
  labs(title = "Normal Q-Q plot of residuals", x = "theoretical", y = "sample") + th
ggsave("attachments/fig5_qq.png", p5, width = 5.5, height = 4, dpi = 150)

# ---- export for SPSS + for the report builder ----
write_sav(d, "student_model_vars.sav")
write.csv(d, "student_model_vars.csv", row.names = FALSE)

tab <- coef(s)
out <- list(
  desc = as.data.frame(desc) |> transform(var = rownames(desc)),
  coef = data.frame(term = rownames(tab), estimate = tab[, 1], se = tab[, 2], t = tab[, 3], p = tab[, 4],
                    log10p = pt(-abs(tab[, 3]), s$df[2], log.p = TRUE) / log(10) + log10(2),
                    lo = ci[, 1], hi = ci[, 2], row.names = NULL),
  fit = list(R2 = s$r.squared, adjR2 = s$adj.r.squared, sigma = s$sigma, df_r = unname(s$fstatistic[2]), df_e = unname(s$fstatistic[3]),
             F = unname(s$fstatistic[1]), p = a0$`Pr(>F)`[2], SSR = a0$`Sum of Sq`[2], SSE = a0$RSS[2], SST = a0$RSS[1],
             log10p = pf(s$fstatistic[1], s$fstatistic[2], s$fstatistic[3], lower.tail = FALSE, log.p = TRUE) / log(10),
             Fcrit = qf(.95, s$fstatistic[2], s$fstatistic[3]), tcrit = qt(.975, s$df[2])),
  vif = as.list(v), std_beta = as.list(setNames(unname(zb), xs)),
  diag = list(shapiro_W = unname(sh$statistic), shapiro_p = sh$p.value, bp = unname(bp$statistic), bp_p = bp$p.value,
              bp_df = unname(bp$parameter), dw = unname(dw$statistic),
              resid_skew = mean(resid(m)^3) / mean(resid(m)^2)^1.5,
              resid_exkurt = mean(resid(m)^4) / mean(resid(m)^2)^2 - 3),
  block = list(F = a1$F[2], df1 = a1$Df[2], df2 = a1$Res.Df[2], p = a1$`Pr(>F)`[2], r2_reduced = summary(mr)$r.squared),
  cor = round(cor(d), 6)
)
write(toJSON(out, auto_unbox = TRUE, digits = NA, pretty = TRUE), "scratch/r_results.json")
cat("\nDONE\n")
