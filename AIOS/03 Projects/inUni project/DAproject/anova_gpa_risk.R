# =============================================================
# One-way ANOVA: GPA (academic_performance) ~ risk_level
# Dataset : student.csv (Student Lifestyle, Mental Health & Burnout)
# Sample  : stratified, 10 per group (n = 30), seed = 42
# Uses base R only (no extra packages)
# =============================================================

SEED      <- 42
N_PER_GRP <- 10
ALPHA     <- 0.05
IQR_K     <- 1.5

# ---------- 1. Load ----------
df <- read.csv("student.csv", stringsAsFactors = FALSE)
df <- df[, names(df) != "X"]          # drop pandas index column
cat("Raw rows:", nrow(df), "\n")

# ---------- 2. Clean (follows stu.ipynb steps) ----------
# 2.1 Duplicates
df <- df[!duplicated(df), ]
cat("After dropping duplicates:", nrow(df), "\n")

# 2.2 Missing values in analysis columns
df <- df[!is.na(df$academic_performance) & !is.na(df$risk_level) &
         df$risk_level != "", ]
cat("After dropping NA:", nrow(df), "\n")

# 2.3 Outliers by IQR (upper fence uses Q3 - fixes notebook bug)
q1 <- quantile(df$academic_performance, 0.25)
q3 <- quantile(df$academic_performance, 0.75)
iqr <- q3 - q1
lower <- q1 - IQR_K * iqr
upper <- q3 + IQR_K * iqr
df <- df[df$academic_performance >= lower & df$academic_performance <= upper, ]
cat(sprintf("IQR fences: [%.4f, %.4f]\n", lower, upper))
cat("After removing outliers:", nrow(df), "\n")

df$risk_level <- factor(df$risk_level, levels = c("Low", "Medium", "High"))

# ---------- 3. Stratified sample n = 30 ----------
set.seed(SEED)
idx <- unlist(lapply(levels(df$risk_level), function(g) {
  sample(which(df$risk_level == g), N_PER_GRP)
}))
s <- df[idx, c("risk_level", "academic_performance")]
s$academic_performance <- round(s$academic_performance, 2)  # 2 dp for manual calc
rownames(s) <- NULL
write.csv(s, "sample_30.csv", row.names = FALSE)
print(s)

# ---------- 4. Descriptive statistics ----------
desc <- aggregate(academic_performance ~ risk_level, data = s,
                  FUN = function(x) c(n = length(x), mean = mean(x),
                                      sd = sd(x), sum = sum(x),
                                      sumsq = sum(x^2)))
print(do.call(data.frame, desc))
cat("Grand mean:", mean(s$academic_performance), "\n")

# ---------- 5. Assumption checks ----------
print(tapply(s$academic_performance, s$risk_level, function(x) shapiro.test(x)$p.value))
print(bartlett.test(academic_performance ~ risk_level, data = s))

# ---------- 6. One-way ANOVA ----------
fit <- aov(academic_performance ~ risk_level, data = s)
print(summary(fit))
cat("F critical (alpha = 0.05):", qf(1 - ALPHA, 2, 27), "\n")

# ---------- 7. Post-hoc (only meaningful if H0 rejected) ----------
print(TukeyHSD(fit))
