const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Postschema = new Schema({
  Project_title: {
    type: String,
    require: true,
  },
  Project_body: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("project", Postschema);
