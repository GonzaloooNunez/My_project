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
  const gameId = req.params.id;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment is required" });
  }

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }
    console.log(gameId);
    //game.comments.push({ userId, comment }); // METER USERID SI O SI
    game.comments.push({ comment, userId });

    await game.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

module.exports = { addRating, addComment };
