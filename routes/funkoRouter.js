const express = require("express");
const funkoRouter = express.Router();
const Funko = require('../models/Funko.js');

// GET all funkos
funkoRouter.get("/", (req, res, next) => {
  Funko.find()
    .populate('comments') // Use populate on the query
    .exec((err, populatedFunkos) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while populating comments' });
      }
      res.status(200).json(populatedFunkos);
    });
});

// GET funko by user
funkoRouter.get("/user", (req, res, next) => {
  Funko.find({ user: req.auth._id }, (err, funko) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(200).json(funko);
  });
});

// POST an funko
// POST an funko with comments
funkoRouter.post("/", async (req, res, next) => {
  req.body.user = req.auth._id;
  const newFunko = new Funko(req.body);

  // If comments are included in the request body, add them to the issue
  if (req.body.comments) {
    newFunko.comments = req.body.comments;
  }

  newFunko.save((err, savedFunko) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    res.status(201).json(savedFunko);
  });
});

// DELETE an issue by issue ID
funkoRouter.delete("/user/:funkoId", (req, res, next) => {
  Funko.findOneAndDelete(
    { _id: req.params.funkoId, user: req.auth._id },
    (err, deletedFunko) => {
      console.log(deletedFunko)
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).json({ message: `Successfully deleted Funko` });
    }
  );
});

// PUT/update an issue by issue ID
funkoRouter.put("/user/:funkoId", (req, res, next) => {
  Funko.findOneAndUpdate(
    { _id: req.params.funkoId, user: req.auth._id },
    req.body,
    { new: true },
    (err, updatedFunko) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      res.status(200).json(updatedFunko);
    }
  );
});

// Like an issue by issue ID
funkoRouter.put("/like/:funkoId", (req, res, next) => {
  Funko.findOneAndUpdate(
    {_id:req.params.funkoId},
    {$addToSet:{userLikes:req.auth._id}, 
  $pull:{userDisLikes: req.auth._id}
  },{new: true},
  (err, updatedFunko) => {
    if(err){
      res.status(500);
      return next(err);
    }
    return res.status(201).send(updatedFunko)
  }
  )
});

// Dislike an issue by issue ID
funkoRouter.put("/dislike/:funkoId", (req, res, next) => {
  Funko.findOneAndUpdate(
    {_id:req.params.funkoId},
    {$addToSet:{userDisLikes:req.auth._id}, 
  $pull:{userLikes: req.auth._id}
  },{new: true},
  (err, updatedFunko) => {
    if(err){
      res.status(500);
      return next(err);
    }
    return res.status(201).send(updatedFunko)
  }
  )
});



module.exports = funkoRouter;
