const express = require("express");
const router = express.Router();
const Post = require("../models/project");
const project = require("../models/project");

// router.get("/project-yash", async (req, res) => {
//   try {
//     const local = {
//       title: "Project Page",
//       description: "This is the project page",
//     };
//     const data = await Post.find();
//     res.render("project/index", { local, data });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/project-yash", async (req, res) => {
  try {
    const local = {
      title: "Nodejs blog",
      description: "simple blog created with nodejs, express & mongodb",
    };
    let perpage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perpage * page - perpage)
      .limit(perpage)
      .exec();

    const count = await Post.countDocuments();
    const nextpage = parseInt(page) + 1;
    const hasNextPage = nextpage <= Math.ceil(count / perpage);

    res.render("project/index", {
      local,
      data,
      current: page,
      nextpage: hasNextPage ? nextpage : null,
    });
  } catch (error) {
    console.log(error);
  }
});

// router.get("/project-post.ejs/:id", async (req, res) => {
//   try {
//     let slug = req.params.id;
//     const data = await project.findById({ _id: slug });
//     const local = {
//       title: data.Project_title,
//       description: "simple blog created with nodejs, express & mongodb",
//     };
//     res.render("project-yash", { local, data });
//   } catch (error) {
//     console.log(error);
//   }
// });

router.get("/project-post.ejs/:id", async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await project.findById(slug); // Remove the curly braces
    if (!data) {
      // Handle the case where no project is found with the given ID
      return res.status(404).send("Project not found");
    }
    const local = {
      title: data.Project_title,
      description: "simple blog created with nodejs, express & mongodb",
    };
    res.render("project-yash", { local, data });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/project-search", async (req, res) => {
  try {
    const local = {
      title: "search",
      description: "simple blog created with nodejs, express & mongodb",
    };

    let searchterm = req.body.searchterm;
    const searchnospecialchar = searchterm.replace(/[^a-zA-Z0-0]/g, "");

    const data = await Post.find({
      $or: [
        { Project_title: { $regex: new RegExp(searchnospecialchar, "i") } },
        { Project_body: { $regex: new RegExp(searchnospecialchar, "i") } },
      ],
    });
    res.render("project/project-search", {
      data,
      local,
    });
  } catch (error) {
    console.log(error);
  }
});

// function insertdata() {
//   Post.insertMany([
//     {
//       Project_title: "Yash PortFolio",
//       Project_body: "this is my portfolio that created using full stack",
//       require: true,
//       type: String,
//     },
//   ]);
// }
// insertdata();

module.exports = router;
