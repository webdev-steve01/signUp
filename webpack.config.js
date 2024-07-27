
const path = require("path");
const { platform } = require("process");
const { Template } = require("webpack");

module.exports = {
  mode: "production",
  entry: "./components/src/auth.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  cache: {
    type: "filesystem",
  },
  watch: true,
};
