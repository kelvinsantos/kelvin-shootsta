import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  key: String,
  etag: String,
  thumbnail: String
}, {
  timestamps: true
});

export default mongoose.model("Videos", videoSchema);
