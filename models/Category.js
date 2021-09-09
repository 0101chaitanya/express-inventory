const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    default: "",
    enum: ["Graphics cards", "Mice", "CPU"],
  },
});

CategorySchema.set("toObject", { virtuals: true });
CategorySchema.set("toJSON", { virtuals: true });

CategorySchema.virtual("url").get(function () {
  return `/store/category/${this._id}`;
});

module.exports = mongoose.model("category", CategorySchema);
