const Game = require("../models/Games");
const Usuario = require("../models/Usuario");

const addRating = async (req, res) => {
  const gameId = req.params.id;
  const { rating } = req.body;
  const { id } = req.user;

  try {
    const game = await Game.findById(gameId);

    console.log(game);

    const alreadyUserRating = game.ratings.findIndex(
      (rating) => rating.userId.toString() === id
    );
    console.log(alreadyUserRating);

    if (alreadyUserRating === -1) {
      game.ratings.push({ userId: id, rating });
    } else {
      const userRating = game.ratings[alreadyUserRating];
      userRating.rating = rating;
    }

    await game.save();
    res.status(200).json({ message: "Rating added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error adding rating", error });
  }
};

const addComment = async (req, res) => {
  const gameId = req.params.id;
  const { comment } = req.body;
  const { id, name } = req.user;

  if (!comment || !id) {
    return res.status(400).json({ message: "Comment and userId are required" });
  }

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    game.comments.push({
      comment,
      userId: id,
      userName: name,
      date: new Date(),
    });

    await game.save();
    res.status(200).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

module.exports = { addComment };

const deleteComment = async (req, res) => {
  const gameId = req.params.id;
  const commentId = req.params.commentId;
  const userId = req.user.id;

  try {
    const game = await Game.findById(gameId);
    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const user = await Usuario.findById(userId);
    let commentIndex = -1;

    if (user.role === "Admin") {
      commentIndex = game.comments.findIndex(
        (comment) => comment._id.toString() === commentId
      );
    } else {
      commentIndex = game.comments.findIndex(
        (comment) =>
          comment._id.toString() === commentId &&
          comment.userId.toString() === userId
      );
    }
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
