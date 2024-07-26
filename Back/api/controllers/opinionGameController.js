const Game = require("../models/Games");

const addRating = async (req, res) => {
  const { gameId } = req.params;
  const { rating } = req.body;
  const userId = req.user.id;

  try {
    const game = await Game.findById(gameId);
    game.ratings.push({ userId, rating });
    await game.save();
    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding rating", error });
  }
};

const addComment = async (req, res) => {
  const { gameId } = req.params;
  const { comment } = req.body;
  const userId = req.user.id;

  try {
    const game = await Game.findById(gameId);
    game.comments.push({ userId, comment });
    await game.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

module.exports = { addRating, addComment };
