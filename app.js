var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var connectDB = require("./config/db");
var dotenv = require("dotenv");
var app = express();
dotenv.config({ path: path.join(__dirname, "config/config.env") });

connectDB();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
    }
    let method = req.body._method;
    delete req.body._method;
    return method;
  })
);

const hbs = exphbs.create({
  defaultLayout: "layout",
  extname: ".hbs",
  partialsDir: path.join(__dirname, "views/partials"),
  layoutsDir: path.join(__dirname, "views"),
  helpers: {
    select: function (selected, options) {
      return options
        .fn(this)
        .replace(
          new RegExp(' value="' + selected + '"'),
          '$& selected="selected"'
        )
        .replace(
          new RegExp(">" + selected + "</option>"),
          ' selected="selected"$&'
        );
    },
  },
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
// catch 404 and forward to error handler

// error handler
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log("listening on port " + port);
});

module.exports = app;
