const Character = require("../models/Character");

const getRaceStats = async (req, res) => {
  try {
    const stats = await Character.aggregate([
      { $group: { _id: "$race", count: { $sum: 1 } } },
      { $project: { race: "$_id", count: 1, _id: 0 } }
    ]);
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Помилка при отриманні статистики" });
  }
};

module.exports = { getRaceStats };
