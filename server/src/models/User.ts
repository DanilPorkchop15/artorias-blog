import { Schema, model } from "mongoose";
import {IUserDocument, TUser} from "../types/User.type";


const userSchema: Schema = new Schema<TUser>({
  fullName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  avatar: String
}, {
  timestamps: true
});

export default model<IUserDocument>("User", userSchema);
