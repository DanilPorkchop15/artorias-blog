import { Schema, model, Document } from "mongoose";

export type TUser = {
  fullName: string;
  passwordHash: string;
  email: string;
  avatar: string;
}

export interface IUser extends TUser, Document {}

const userSchema: Schema = new Schema<TUser>({
  fullName: {
    type: String,
    required: true
  },
  passwordHash: {
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

export default model<IUser>("User", userSchema);
