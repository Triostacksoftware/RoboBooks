import { Schema, model } from "mongoose";

const cmsContentSchema = new Schema(
  {
    section: {
      type: String,
      required: true,
      unique: true,
      enum: ["hero", "about"],
    },
    content: {
      type: Schema.Types.Mixed,
      default: {},
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      default: null,
    },
  },
  { timestamps: true }
);

export default model("CmsContent", cmsContentSchema);
