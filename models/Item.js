const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  number_in_stock: {
    type: String,
    required: true,
    trim: true,
  },
});

ItemSchema.set("toObject", { virtuals: true });
ItemSchema.set("toJSON", { virtuals: true });

ItemSchema.virtual("url").get(function () {
  return `/store/item/${this._id}`;
});

module.exports = mongoose.model("item", ItemSchema);
