export const progressBar = (
  current: number,
  total: number,
  barLength: number = 40,
): void => {
  const percentage = current / total;
  const progress = Math.round(barLength * percentage);
  const emptyProgress = barLength - progress;

  const progressText = "█".repeat(progress); // Progress bar filled
  const emptyProgressText = "░".repeat(emptyProgress); // Progress bar empty

  const percentageText = Math.round(percentage * 100) + "%";

  process.stdout.clearLine(0); // Clear the line from the cursor to the end
  process.stdout.cursorTo(0); // Move the cursor to the start of the line
  process.stdout.write(
    `[${progressText}${emptyProgressText}] ${percentageText} (${current}/${total})`,
  );
};
