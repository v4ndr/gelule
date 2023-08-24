const fs = require('fs');

class Logs {
  static submitLogs(logs, anonId) {
    const date = new Date();
    const dateString = date.toISOString();
    let logsString = '';
    logs.forEach((log) => {
      logsString += `${log}\n`;
    });
    fs.writeFileSync(`logs/${anonId} (${dateString}).log`, logsString);
    return { success: true };
  }
}

module.exports = Logs;
