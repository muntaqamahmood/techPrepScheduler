import { Router } from "express";
import jdoodle from "jdoodle-api";
import compiler from "compiler-api";
export const compilerRouter = Router();

// @route
// @desc    compile code
// @access  Private
compilerRouter.post("/", async (req, res) => {
  //check for valid fields
  if (!req.body.language || !req.body.script) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  //check for valid language
  if (
    req.body.language !== "c" &&
    req.body.language !== "java" &&
    req.body.language !== "python3"
  ) {
    return res.status(400).json({ msg: "Please enter a valid language" });
  }

  const data = {
    lang: req.body.language,
    code: req.body.script,
    input: "",
  };
  console.log("wack");
  compiler.compilerApi(data, (result) => {
    console.log(result);
    res.send(result);
  });
});
