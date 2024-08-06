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
  const { id, name } = req.user; // Obtenido del middleware

  console.log(req.user);

  if (!comment || !id) {
    return res.status(400).json({ message: "Comment and userId are required" });
  }

  try {
    //console.log(gameId);
    const game = await Game.findById(gameId);
    //console.log(game);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    game.comments.push({ comment, userId: id, userName: name });

    await game.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const deleteComment = async (req, res) => {
  const gameId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.user.id;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const commentIndex = game.comments.findIndex(
      (comment) =>
        comment._id.toString() === commentId &&
        comment.userId.toString() === userId
    );

    if (commentIndex === -1) {
      return res
        .status(403)
        .json({ message: "Comment not found or unauthorized" });
    }

    game.comments.splice(commentIndex, 1);

    await game.save();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment", error });
  }
};

module.exports = { addRating, addComment, deleteComment };
