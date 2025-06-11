const SessionLog = require("../models/SessionLog");

exports.start = async (req, res) => {
  const entry = new SessionLog({ message: "Сесія почалась" });
  await entry.save();
  res.json({ message: "Session started" });
};

exports.end = async (req, res) => {
  const entry = new SessionLog({ message: "Сесія завершена" });
  await entry.save();
  res.json({ message: "Session ended" });
};

exports.log = async (req, res) => {
  const logs = await SessionLog.find().sort({ createdAt: -1 });
  res.json(logs.map(log => `${log.message}: ${log.createdAt.toLocaleString()}`));
};