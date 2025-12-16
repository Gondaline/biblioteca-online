import mongoose from "mongoose";

export default function validarObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}