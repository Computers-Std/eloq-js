function activityTable(day) {
  // First read the main log file
  return textFile("camera_logs.txt")
    .then((logFileList) => {
      // Get the specific day's log file name
      const dayLogFileName = logFileList.split("\n")[day].trim();

      // Return both the day's filename and the promise for its contents
      return Promise.all([dayLogFileName, textFile(dayLogFileName)]);
    })
    .then(([dayLogFileName, dayLogContents]) => {
      // Process timestamps into ISO strings
      const dayLogsArray = dayLogContents
        .split("\n")
        .filter((line) => line.trim() !== "")
        .map((time) => new Date(Number(time)).toISOString());

      // Count logs per hour
      const hourLogs = Array(24).fill(0);

      dayLogsArray.forEach((isoString) => {
        const hour = new Date(isoString).getUTCHours();
        hourLogs[hour]++;
      });

      console.log(hourLogs);
      return hourLogs;
    })
    .catch((error) => {
      console.error("Error processing logs:", error);
      throw error;
    });
}
