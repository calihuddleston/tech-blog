const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Create new post
router.post("/", async (req, res) => {
  try {
    const dbPostData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update post
router.put("/", async (req, res) => {
  try {
    const dbPostData = await Post.update({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(dbPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
