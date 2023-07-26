import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: String,
  url: String,
});

const User = models.User || model("User", UserSchema);
export default User;
