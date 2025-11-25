import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  }
}

const IUserSchema: Schema = new Schema<IUser>({
  username: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true},
  authentication: {
    password: { type: String, required: true, select: false},
    salt: { type: String, select: false},
    sessionToken: { type: String, select: false},
  }
});

export const UserModel: Model<IUser> = mongoose.model<IUser>('Users', IUserSchema);