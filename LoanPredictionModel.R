library(readxl)
HypotheticalBank <- read_excel("C:/Users/USER/Desktop/UNI LIFE/DS/ass/HypotheticalBank.xls", sheet = "Data", skip = 2)
View(HypotheticalBank)
str(HypotheticalBank)
summary(HypotheticalBank)
HypotheticalBank$ID <- NULL
str(HypotheticalBank)
HypotheticalBank$`ZIP Code` <- NULL
HypotheticalBank$`Personal Loan` <- as.factor(HypotheticalBank$`Personal Loan`)
table(HypotheticalBank$`Personal Loan`)
set.seed(20)
train_index <- sample(1:nrow(HypotheticalBank), 0.6*nrow(HypotheticalBank))
train_data <- HypotheticalBank[train_index, ]
valid_data <- HypotheticalBank[-train_index, ]
dim(train_data)
dim(valid_data)
normalize <- function(x){return((x - min(x)) / (max(x) - min(x)))}
train_norm <- as.data.frame(lapply(train_data[, -which(names(train_data)=="Personal Loan")], normalize))
valid_norm <- as.data.frame(lapply(valid_data[, -which(names(valid_data)=="Personal Loan")], normalize))
train_target <- train_data$`Personal Loan`
valid_target <- valid_data$`Personal Loan`
install.packages("class")
library(class)
accuracy <- c()
for(i in 1:20){
  pred <- knn(
      train = train_norm,
      test = valid_norm,
      cl = train_target,
      k = i)
      accuracy[i] <- mean(pred == valid_target)
}
accuracy
which.max(accuracy)
plot(1:20, accuracy, type="b",
     xlab="k value",
     ylab="Accuracy")
knn_pred <- knn(
  train = train_norm,
  test = valid_norm,
  cl = train_target,
  k = 3
  )
table(Predicted = knn_pred, Actual = valid_target)
mean(best_knn_pred == valid_target)
library(caret)
confusionMatrix(best_knn_pred, valid_target, positive = "1")
# --- STEP 8: PREDICTING NEW CUSTOMERS (DATA TO SCORE) ---
# 1. Load the scoring sheet
install.packages("readxl")
library(readxl)
scoring_data <- read_excel("C:/Users/USER/Desktop/UNI LIFE/DS/ass/HypotheticalBank.xls", sheet = "Data to Score")
# 1. Clean the scoring data (Remove ID, ZIP, and Personal Loan if it exists)
scoring_clean <- scoring_data
scoring_clean$ID <- NULL
scoring_clean$`ZIP Code` <- NULL
scoring_clean$Experience <- abs(scoring_clean$Experience)
# If 'Personal Loan' is in the scoring sheet, we must remove it for the model
if("Personal Loan" %in% names(scoring_clean)) {scoring_clean$`Personal Loan` <- NULL}
# 2. GET TRAINING PARAMETERS (The "Yardstick")
# We use the original train_data (before it was normalized) to get Min and Max
train_features_only <- train_data[, -which(names(train_data) == "Personal Loan")]
train_min <- apply(train_features_only, 2, min)
train_max <- apply(train_features_only, 2, max)
train_range <- train_max - train_min
 
# Fix: prevent division by zero if a column has no variation
train_range[train_range == 0] <- 1
# 3. NORMALIZE SCORING DATA using the Training Yardstick
# This ensures the new data is on the exact same scale as the model's training
scoring_norm <- as.data.frame(scale(scoring_clean, center = train_min, scale = train_range))
# 4. SAFETY CHECK: Replace any NaN with 0 
# (This happens if a feature was constant in training but different in scoring)
scoring_norm[is.na(scoring_norm)] <- 0
# 5. RUN THE PREDICTION (Using k=3 as decided)
# We use knn_pred from your previous step's logic
final_predictions <- knn(
    train = train_norm, 
    test = scoring_norm, 
    cl = train_target, 
    k = 3)
# 6. DISPLAY FINAL RESULTS
# This table shows the ID and whether they are likely to take a loan (1) or not (0)
final_results_table <- data.frame(
   CustomerID = scoring_data$ID, 
   Loan_Prediction = final_predictions)

print("--- FINAL PREDICTIONS FOR DATA TO SCORE ---")
print(final_results_table)
# --- Plotting the Accuracy to find the Best k ---

# This creates the line graph with points
plot(1:20, accuracy, type="b", 
         xlab="Number of Neighbors (k)", 
         ylab="Validation Accuracy", 
         main="k-NN Accuracy Optimization",
         col="darkblue", 
         lwd=2,      # Line width
         pch=19)     # Solid circle points
 
# This adds a vertical dashed line at k=3 to show it's the winner
abline(v=3, col="red", lty=2)

# This adds a text label to the red line
text(3.5, 0.96, "Best k = 3", col="red")
# --- Cross-Validation for k ---
# 1. Define the "Cross-Validation" settings (e.g., 10-fold)
control <- trainControl(method = "cv", number = 10)
# 2. Tell R to test a range of k values (e.g., 1 to 20)
  search_grid <- expand.grid(k = seq(1, 20, by = 1))
# 3. Run the "Train" function which does the Cross-Validation automatically
  cv_model <- train(
    Personal Loan` ~ ., 
    data = train_data,      # Use your original (un-normalized) training data
    method = "knn",
    trControl = control,
    tuneGrid = search_grid,
    preProcess = c("center", "scale") # This normalizes for you!)
# 4. See the results
print(cv_model)
plot(cv_model)
# Install and load kknn for weighted distance
if(!require(kknn)) install.packages("kknn")
library(kknn)
# --- 1. Weighted Distance k-NN ---
# We use 'kernel = "triangular"' which is a popular weighting method
weighted_knn <- kknn(
    formula = `Personal Loan` ~ ., 
    train = train_data, 
    test = valid_data, 
    k = 3, 
    kernel = "triangular")
# Get predictions
weighted_preds <- fitted(weighted_knn)
# --- 2. Comparison Matrix ---
print("Weighted k-NN Confusion Matrix:")
confusionMatrix(weighted_preds, valid_target, positive = "1")
# --- Euclidean Distance Metric (Standard k-NN) ---
library(class)
#We use k=3 as our best k
euclidean_pred <- knn(
 train = train_norm, 
 test = valid_norm, 
 cl = train_target, 
 k = 3
)
# Show Results
print("Results for Euclidean Distance:")
table(Predicted = euclidean_pred, Actual = valid_target)
mean(euclidean_pred == valid_target)
# --- Visualization of Data Partition ---
# 1. Create a table of the sizes
partition_sizes <- c(Training = nrow(train_data), Validation = nrow(valid_data))
# 2. Create the Bar Plot
barplot(partition_sizes, 
                   main="Data Partition Distribution",
                   col=c("skyblue", "orange"),
                   ylab="Number of Records",
                   ylim=c(0, 3500))
# 3. Add text labels on top of the bars
text(x = 1:2, y = partition_sizes + 100, labels = partition_sizes, font=2)
# This draws the x-axis line
axis(1, at=c(0, 10), labels=FALSE, lwd=1)
str(HypotheticalBank)
# --- Objective 2: Spotting Cross-Selling Opportunities ---
# 1. Filter the validation data to only see those we PREDICTED would take a loan
likely_loan_takers <- valid_data[knn_pred == 1, ]

# 2. Look at their other accounts (CD Account, Securities, etc.)
cross_sell_summary <- colMeans(likely_loan_takers[, c("CD Account", "Securities Account", "Online", "CreditCard")] == 1)

print("Percentage of likely loan takers who have other products:")
print(cross_sell_summary)
# Format the results into a clean table
opportunity_table <- data.frame(
       Product = names(cross_sell_summary), 
       Percentage_Holders = paste0(round(as.numeric(cross_sell_summary) * 100, 2), "%"))

# Print without the row names for a cleaner look
print(opportunity_table, row.names = FALSE)
library(class)
# Test k values from 1 to 20
accuracy <- numeric(20)

for(i in 1:20) {
        pred <- knn(train = train_norm, 
                                      test = valid_norm, 
                                      cl = train_target, 
                                      k = i)
        accuracy[i] <- mean(pred == valid_target)
}
# Find best k
best_k <- which.max(accuracy)
cat("Optimal k value:", best_k)
cat("Best accuracy:", accuracy[best_k])
# Visualization - Accuracy vs k
plot(1:20, accuracy, 
             type = "b", 
             col = "blue", 
             pch = 19,
             xlab = "k (Number of Neighbors)", 
             ylab = "Accuracy",
             main = "Accuracy vs. k Value")
points(best_k, accuracy[best_k], col = "red", pch = 19, cex = 1.5)
abline(v = best_k, col = "red", lty = 2)
grid()
library(class)
cat("Best accuracy:", round(accuracy[best_k] * 100, 2), "%\n")
# Create a detailed accuracy table
accuracy_table <- data.frame(
  k = 1:20,
  Accuracy = round(accuracy * 100, 2)
  )
print(accuracy_table)
# Enhanced Visualization - Accuracy vs k with detailed grid
 plot(1:20, accuracy * 100,  # Convert to percentage
             type = "b", 
             col = "blue", 
             pch = 19,
             xlab = "k (Number of Neighbors)", 
             ylab = "Accuracy (%)",
             main = "Accuracy vs. k Value (Detailed Grid)",
             xaxt = "n",  # Remove default x-axis
             yaxt = "n",  # Remove default y-axis
             ylim = c(90, 100),  # Adjust based on your accuracy range
            xlim = c(0.5, 20.5))

  # Add custom x-axis with all k values
  axis(1, at = 1:20, labels = 1:20, cex.axis = 0.8)

  # Add custom y-axis with 1% increments
  axis(2, at = seq(90, 100, by = 1), labels = paste0(seq(90, 100, by = 1), "%"), 
               cex.axis = 0.8, las = 2)

# Add grid lines at each k value
abline(v = 1:20, col = "lightgray", lty = 3, lwd = 0.5)
 
# Add horizontal grid lines at each percentage point
abline(h = seq(90, 100, by = 1), col = "lightgray", lty = 3, lwd = 0.5)
 
# Highlight the best k
 points(best_k, accuracy[best_k] * 100, col = "red", pch = 19, cex = 1.5)
abline(v = best_k, col = "red", lty = 2, lwd = 1.5)
 
# Add text labels for each point
text(1:20, accuracy * 100, labels = paste0(round(accuracy * 100, 1), "%"), 
               pos = 3, cex = 0.7, col = "darkblue")
 
# Add legend
legend("bottomright", 
                   legend = c("Accuracy", paste("Best k =", best_k)),
                   col = c("blue", "red"),
                   pch = c(19, 19),
                   lty = c(1, 2),
                   lwd = c(1, 1.5),
                   cex = 0.8)
 
# Create a bar plot alternative for clearer visualization
library(ggplot2)
 
# Create data frame for ggplot
   accuracy_df <- data.frame(
         k = 1:20,
         Accuracy = accuracy * 100
    )

 # Bar plot with detailed labels
 ggplot(accuracy_df, aes(x = factor(k), y = Accuracy, fill = k == best_k)) 
 geom_bar(stat = "identity", width = 0.7) 
         geom_text(aes(label = sprintf("%.1f%%", Accuracy)), vjust = -0.5, size = 3) 
         scale_fill_manual(values = c("FALSE" = "steelblue", "TRUE" = "red"), guide = FALSE) 
         labs(title = "k-NN Accuracy for Different k Values",
                          subtitle = paste("Optimal k =", best_k, "with", round(accuracy[best_k] * 100, 2), "% accuracy"),
                          x = "k (Number of Neighbors)",
                        y = "Accuracy (%)") 
         theme_minimal() 
         theme(
               axis.text.x = element_text(angle = 0, size = 10),
               panel.grid.major.x = element_line(color = "lightgray", linetype = "dotted"),
               panel.grid.minor.x = element_blank(),
               panel.grid.major.y = element_line(color = "lightgray", linetype = "solid"),
               panel.grid.minor.y = element_line(color = "lightgray", linetype = "dotted", linewidth = 0.2)
           ) 
         scale_y_continuous(breaks = seq(90, 100, by = 1), 
                                                      limits = c(0, 100),
                                                     expand = expansion(mult = c(0, 0.05)))  
 # Create a heatmap-style table visualization
library(knitr)
         # k-NN with best k
         best_knn_pred <- knn(train = train_norm, 
                                                      test = valid_norm, 
                                                      cl = train_target, 
                                                      k = best_k)
         
# Create confusion matrix
library(caret)
confusion_matrix <- confusionMatrix(as.factor(best_knn_pred), as.factor(valid_target))
 
#Display confusion matrix
print(confusion_matrix)    

# Visualize confusion matrix
library(ggplot2)
cm_df <- as.data.frame(confusion_matrix$table)
ggplot(cm_df, aes(Prediction, Reference, fill = Freq)) +
     geom_tile() +
     geom_text(aes(label = Freq), size = 8) +
     scale_fill_gradient(low = "white", high = "steelblue") +
     labs(title = paste("Confusion Matrix (k =", best_k, ")"),  x = "Predicted", y = "Actual") 
     theme_minimal()
 # --- Visualize Confusion Matrix (Fourfold Plot) ---
 
# 1. Capture the table from your previous results
cm_table <- table(Predicted = knn_pred, Actual = valid_target)
 
# 2. Create the plot
fourfoldplot(cm_table, 
              color = c("#CC6666", "#99CC99"), # Red for errors, Green for correct
              conf.level = 0, 
              margin = 1, 
              main = "Confusion Matrix: Prediction Accuracy")

# --- Visualize Confusion Matrix (Heatmap) ---
 library(ggplot2)
 
 # Convert table to a data frame for ggplot
 cm_df <- as.data.frame(cm_table)

  ggplot(data = cm_df, aes(x = Actual, y = Predicted, fill = Freq)) +
      geom_tile(color = "white") +
      scale_fill_gradient(low = "white", high = "steelblue") +
      geom_text(aes(label = Freq), vjust = 1, size = 5) +
labs(title = "Confusion Matrix Heatmap",
          x = "Actual Loan Acceptance",
          y = "Predicted Loan Acceptance") +
     theme_minimal()
# Create comparison table
  comparison <- data.frame(
       Distance_Metric = c("Euclidean", "Manhattan"),
       Accuracy = c(euclidean_acc, manhattan_acc)
   )
  # --- CRITERIA (D): Accuracy Comparison Visualization ---
 
 # 1. Create the comparison data frame
 # (Using the values from your Euclidean (0.966) and Weighted/Manhattan results)
 comparison <- data.frame(
     Distance_Metric = c("Euclidean", "Weighted"),
     Accuracy = c(0.966, 0.962) # Replace 0.962 with your actual Manhattan result
 )
 
 # 2. Professional Barplot
 bp <- barplot(comparison$Accuracy, 
             names.arg = comparison$Distance_Metric,
               col = c("steelblue", "lightcoral"),
               ylim = c(0, 1.1),  # Extra space for labels
               main = "Accuracy Comparison: Euclidean vs Weighted",
               ylab = "Accuracy Score",
               border = "white")
 
 # 3. Add a horizontal reference line at your best score
 abline(h = 0.966, col = "red", lty = 2, lwd = 2)
 
# 4. Add text labels on top of each bar for clarity
 text(x = bp, y = comparison$Accuracy, 
      labels = round(comparison$Accuracy, 3), 
      pos = 3, cex = 1.2, font = 2)
 # Identify predicted loan acceptors from validation set
 loan_acceptors <- valid_data[best_knn_pred == 1, ]
 
 # Analyze product holdings among predicted loan acceptors
 cross_sell_summary <- data.frame(
     Product = c("CD Account", "Securities Account", "Credit Card", "Online Banking"),
     Percentage = c(
         mean(loan_acceptors$`CD Account`) * 100,
         mean(loan_acceptors$`Securities Account`) * 100,
         mean(loan_acceptors$`CreditCard`) * 100,
         mean(loan_acceptors$`Online`) * 100
     )
 )
 
 print(cross_sell_summary)
 # Visualize cross-selling opportunities
 library(ggplot2)
 ggplot(cross_sell_summary, aes(x = reorder(Product, -Percentage), y = Percentage, fill = Product)) +
     geom_bar(stat = "identity") +
     geom_text(aes(label = sprintf("%.1f%%", Percentage)), vjust = -0.5) +
     labs(title = "Product Holdings Among Predicted Loan Acceptors",
          x = "Product", y = "Percentage (%)") +
     theme_minimal() +
     theme(legend.position = "none")
 # Final results for Data to Score
   final_results <- data.frame(
     Customer_ID = c(6, 7, 8, 9, 10),
     Age = c(37, 53, 50, 35, 34),
      Income = c(29, 72, 22, 81, 180),
      Education = c(2, 2, 3, 2, 3),
      Predicted_Loan = as.character(final_predictions)
  )
 
   print(final_results)
   # Visualize cross-selling opportunities
   library(ggplot2)
   ggplot(cross_sell_summary, aes(x = reorder(Product, -Percentage), y = Percentage, fill = Product)) +
          geom_bar(stat = "identity") +
          geom_text(aes(label = sprintf("%.1f%%", Percentage)), vjust = -0.5) +
          labs(title = "Product Holdings Among Predicted Loan Acceptors",
                         x = "Product", y = "Percentage (%)") +
         theme_minimal() +
       theme(legend.position = "none")
   # Final results for Data to Score
      final_results <- data.frame(
           Customer_ID = c(6, 7, 8, 9, 10),
           Age = c(37, 53, 50, 35, 34),
           Income = c(29, 72, 22, 81, 180),
           Education = c(2, 2, 3, 2, 3),
           Predicted_Loan = as.character(final_predictions)
       )
   
 # Note: Customer 10 should show "1" (will accept loan)
 # Implement k-fold cross-validation
 library(caret)
 ctrl <- trainControl(method = "cv", number = 10)
 
 # Combine normalized data
 full_norm <- rbind(train_norm, valid_norm)
 full_target <- c(train_target, valid_target)
 
 # Cross-validate k values
 cv_results <- data.frame(k = 1:20, Accuracy = NA)
 
 for(k in 1:20) {
     set.seed(123)
     fit <- train(x = full_norm, 
                  y = as.factor(full_target),
                  method = "knn",
                  tuneGrid = data.frame(k = k),
                  trControl = ctrl)
     cv_results$Accuracy[k] <- max(fit$results$Accuracy)
 }
 
 # Find best k from CV
 best_k_cv <- cv_results$k[which.max(cv_results$Accuracy)]
 cat("Cross-validation selected k =", best_k_cv)
 # Plot CV results
 plot(cv_results$k, cv_results$Accuracy, 
      type = "b", col = "darkgreen", pch = 19,
      xlab = "k", ylab = "Cross-validated Accuracy",
      main = "10-Fold Cross-Validation Results")
 points(best_k_cv, max(cv_results$Accuracy), col = "red", pch = 19, cex = 1.5)
 grid()
 # Fix for cross-validation
 library(caret)
 ctrl <- trainControl(method = "cv", number = 10)
 
 # Make sure you're using the right data
 # DON'T combine train and valid - use training data only for CV
 set.seed(123)
 cv_fit <- train(x = train_norm,  # Use training data only!
                 y = as.factor(train_target),
                 method = "knn",
                 tuneGrid = data.frame(k = 1:20),
                 trControl = ctrl)

 # View results
 print(cv_fit)
