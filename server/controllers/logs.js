const Logs = require('../models/Logs');

exports.submitLogs = (req, res) => {
  const { logs, anonId } = req.body;
  try {
    console.log('Logs submitted');
    const logsArray = JSON.parse(logs);
    const result = Logs.submitLogs(logsArray, anonId);
    console.log(result);
    if (result?.success) {
      console.log('Logs submitted from anonId : ', anonId);
      res.status(200).json(result);
    } else {
      console.log('Logs failed to submit from anonId : ', anonId);
      res.status(500).json({ error: 'Failed to submit logs' });
    }
  } catch (err) {
    console.log('Logs failed to submit from anonId : ', anonId);
    console.log(err);
    res.status(500).json({ error: 'Failed to submit logs' });
  }
};
