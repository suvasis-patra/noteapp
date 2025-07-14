import mongoose, { Document } from "mongoose";

import { hashPassword } from "../utils";

export interface IUserRegistration extends Document {
  username: string;
  email: string;
  password: string;
}

const UserRegistrationSchema = new mongoose.Schema<IUserRegistration>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

UserRegistrationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await hashPassword(this.password);
  next();
});

export const User = mongoose.model<IUserRegistration>(
  "User",
  UserRegistrationSchema
);
