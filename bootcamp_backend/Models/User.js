import bcrypt from "bcryptjs";
const { compare, genSalt, hash } = bcrypt;

import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_EXPIRE, JWT_SECRET } from "../Config/index.js";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: [true, "Please add a name"] },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please use valid Email format",
      ],
      unique: true,
      required: [true, "please add an email"],
    },
    role: { type: String, enum: ["user", "publisher"], default: "user" },
    password: { type: String, required: [true, "please add a password"], minlength: 6, select: false },
    resetPasswordToken: String,
    resetPasswordExpire: String,
  },
  { timestamps: true }
);

// hash password before saving
UserSchema.pre("save", async function () {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

// sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, JWT_SECRET, { expiresIn: JWT_EXPIRE || "7d" });
};

// match password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};

export const UserModel = model("User", UserSchema, "User");
