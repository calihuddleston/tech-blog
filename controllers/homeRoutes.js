const router = require("express").Router();
const { User, Post } = require("../models");

// GET all users for homepage with associated posts
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [
        {
          model: Post,
          attributes: ["title", "text"],
        },
      ],
    });

    // const posts = dbUserData.map((posts) => posts.get({ plain: true }));

    res.render("homepage", {
      users,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
