const express = require("express");
const commentRouter = express.Router();
const Comment = require("../models/Comment.js");
const Funko = require("../models/Funko.js");

// GET all comments
commentRouter.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
    
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET comments for a specific issue
commentRouter.get("/:funkoId/comments", async (req, res, next) => {
  try {
    const funkoId = req.params.funkoId;
    const comments = await Comment.find({ Funko: funkoId });
    res.status(200).json(comments);
  } catch (err) {
    console.error('Error fetching comments:', err);
    res.status(500).json({ error: "Internal server error" });
  }
});

commentRouter.post("/:funkoId", async (req, res, next) => {
  try {
    req.body.funko = req.params.funkoId;
    req.body.user = req.auth._id;
    console.log(req.body.comment)
    

    // Create a new comment
    const newComment = new Comment(req.body);
    
    

    // Save the updated issue (with the added comment)
    await newComment.save();

    // Return the saved comment
    res.status(201).send(newComment);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// // DELETE a comment by comment ID
// commentRouter.delete("/:commentId", async (req, res, next) => {
//   try {
//     const commentId = req.params.commentId;
//     const user = req.auth._id; // Assuming the authenticated user is obtained from JWT

//     // Find and delete the comment by ID and user
//     const deletedComment = await Comment.findOneAndDelete({
//       _id: commentId,
//       user: user,
//     });

//     if (!deletedComment) {
//       res.status(404).json({ error: "Comment not found" });
//       return;
//     }

//     res.status(200).json({ message: "Successfully deleted comment" });
//   } catch (err) {
//     console.error('Error deleting a comment:', err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // PUT/update a comment by comment ID
// commentRouter.put("/:commentId", async (req, res, next) => {
//   try {
//     const commentId = req.params.commentId;
//     const user = req.auth._id; // Assuming the authenticated user is obtained from JWT

//     // Find and update the comment by ID and user
//     const updatedComment = await Comment.findOneAndUpdate(
//       { _id: commentId, user: user },
//       { text: req.body.text }, // Adjust based on your comment model
//       { new: true }
//     );

//     if (!updatedComment) {
//       res.status(404).json({ error: "Comment not found" });
//       return;
//     }

//     res.status(200).json(updatedComment);
//   } catch (err) {
//     console.error('Error updating a comment:', err);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

module.exports = commentRouter;
