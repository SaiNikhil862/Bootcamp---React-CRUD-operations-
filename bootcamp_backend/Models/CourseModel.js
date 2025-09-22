import  mongoose from "mongoose";

let { Schema, model } =mongoose
const CourseSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  duration: {
    type: String,
    required: [true, "Please add number of weeks"],
  },
  price: {
    type: Number,
    required: [true, "Please add course price"],
  },
  minimumSkill: {
    type: String,
    required: [true, "Please add a minimum skill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarshipAvailable: {
    type: Boolean,
    default: false,
  },
  bootcamp: {
    type: Schema.ObjectId,
    ref: "Bootcamp",
    required: true,
  },
  image: {
    type: String,
  },
});

export let CourseModel = model("Course", CourseSchema);
