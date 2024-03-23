const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  try {
    const local = {
      title: "Yash - Developer portfolio",
      description: "this is main page o the site",
    };
    res.render("home", { local }); // Renders the home.ejs file
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
