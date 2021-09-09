var express = require("express");
var router = express.Router();
var Item = require("../models/Item");
var Category = require("../models/Category");
/* GET home page. */

const navItems = async () => {
  try {
    const Items = await Category.find({}).lean();
    return Items;
  } catch (err) {
    console.error(err);
    return [];
  }
};
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.find({}).populate("category").lean();
    res.render("home", { items, nav: await navItems() });
  } catch (err) {
    console.error(err);
  }
});
router.get("/add", async (req, res, next) => {
  try {
    res.render("form", {
      method: "add",
      nav: await navItems(),
    });
  } catch (err) {
    console.error(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    let item = new Item({ ...req.body });
    item.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.id })
      .populate("category")
      .lean();
    res.render("home", { items, nav: await navItems() });
  } catch (err) {
    console.error(err);
  }
});
router.get("/edit/:id", async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id })
      .populate("category")
      .lean();
    res.render("form", {
      ...item,
      nav: await navItems(),
      method: "edit",
      PUT: true,
    });
  } catch (err) {
    console.error(err);
  }
});
router.put("/edit/:id", async (req, res) => {
  try {
    let item = await Item.find({ _id: req.params.id }).lean();
    if (!item) {
      return res.status(200).end("Item doesnt exist");
    } else {
      item = await Item.findByIdAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
  }
});
router.get("/delete/:id", async (req, res) => {
  try {
    let item = await Item.find({ _id: req.params.id }).lean();
    if (!item) {
      return res.status(200).end("Item doesnt exist");
    } else {
      item = await Item.remove({ _id: req.params.id });
      res.redirect("/");
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
