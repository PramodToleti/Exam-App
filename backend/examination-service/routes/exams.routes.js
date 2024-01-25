const router = require("express").Router();

const Exam = require("../../shared/models/exam.model");
const authenticate = require("../../shared/middleware/authenticate");

router.route("/all").get(async (req, res) => {
  try {
    const exams = await Exam.find().select("-questions");
    if (!exams.length) {
      return res.status(400).json({
        msg: "No Exam found.",
      });
    }
    res.status(200).json({ exams });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

router.route("/create").post(async (req, res) => {
  try {
    const { title, description, topic, duration, questions } = req.body;
    const newExam = new Exam({
      title,
      duration,
      description,
      topic,
      questions,
    });
    const savedExam = await newExam.save();
    res.status(201).json({ msg: "Exam creation successful!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

router.route("/delete/all").delete(async (req, res) => {
  try {
    const deletedExams = await Exam.deleteMany({});
    if (deletedExams.deletedCount === 0) {
      return res.status(400).json({
        msg: "No exams found to delete.",
      });
    }
    res.status(200).json({ msg: "All exams deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

router.route("/delete/:examId").delete(async (req, res) => {
  try {
    const { examId } = req.params;
    const exam = await Exam.findById({ _id: examId });
    if (!exam) {
      return res.status(400).json({
        msg: "No Exam found.",
      });
    }
    const deletedExam = await Exam.findByIdAndDelete({ _id: examId });
    res.status(200).json({ msg: "Exam deletion successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});

router.route("/topic/:topic").get(async (req, res) => {
  try {
    const { topic } = req.params;
    const exams = await Exam.find({ topic: topic });
    if (!exams) {
      return res.status(400).json({
        msg: "No Exam found.",
      });
    }
    res.status(200).json({ exams });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});
router.route("/submit").post(async (req, res) => {
  try {
    const { studentId, examId, questions } = req.body;
    let answers = await Exam.findById({ _id: examId });
    if (!answers) {
      return res.status(401).send("No Exam found");
    }
    answers = answers.questions;
    let marks = 0;
    for (i = 0; i < questions.length; i++) {
      if (questions[i].answer === answers[i].answer) {
        marks++;
      }
    }
    return res.status(200).json({ marks });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Something went wrong." });
  }
});
module.exports = router;
