const sequelize = require("../config/connection");
const { User, Post } = require("../models");

const dbUserData = require("./userData.json");

const dbPostData = require("./postData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(dbUserData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of dbPostData) {
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].Id,
    });
  }

  process.exit(0);
};

seedDatabase();
