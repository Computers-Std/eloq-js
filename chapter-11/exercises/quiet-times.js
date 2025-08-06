async function activityTable(day) {
  const logFileList = await textFile("camera_logs.txt");

  // Get the specific day's log file name
  const dayLogFileName = logFileList.split("\n")[day].trim();

  // Read the day's log file
  const dayLogContents = await textFile(dayLogFileName);

  // Process timestamps into ISO strings
  const dayLogsArray = dayLogContents
    .split("\n")
    .filter((line) => line.trim() !== "") // Remove empty lines
    .map((time) => new Date(Number(time)).toISOString());

  // Push the count (length) of filtered logs for each hour
  let hourLogs = [];
  for (let hour = 0; hour < 24; hour++) {
    let filteredLogs = dayLogsArray.filter((isoString) => {
      return new Date(isoString).getUTCHours() === hour;
    });
    hourLogs.push(filteredLogs.length);
  }

  console.log(hourLogs);
  return hourLogs;
}

activityTable(1).then((table) => console.log(activityGraph(table)));
