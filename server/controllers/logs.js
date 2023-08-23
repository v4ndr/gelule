const Logs = require('../models/Logs');

exports.submitLogs = (req, res) => {
  const { logs, anonId } = req.body;
  const dateStr = new Date().toISOString();
  try {
    const logsArray = JSON.parse(logs);
    const result = Logs.submitLogs(logsArray, anonId);
    if (result?.success) {
      console.log(`${dateStr} - Logs submitted from anonId : ${anonId}`);
      res.status(200).json(result);
    } else {
      console.log(`${dateStr} - Logs failed to submit from anonId : ${anonId}`);
      res.status(500).json({ error: `${dateStr} - Failed to submit logs` });
    }
  } catch (err) {
    console.log(`${dateStr} - Logs failed to submit from anonId : ${anonId}`);
    console.log(err);
    res.status(500).json({ error: `${dateStr} - Failed to submit logs` });
  }
};
