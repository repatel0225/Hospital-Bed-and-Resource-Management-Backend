import { model, Schema } from "mongoose";

const bedSchema = new Schema(
  {
    _Id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    wardNumber: {
      type: String,
      required: true,
    },
    bedNumber: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["available", "occupied", "reserved"],
      required: true,
    },
  },
  { timestamps: true }
);

export const Bed = model("beds", bedSchema);