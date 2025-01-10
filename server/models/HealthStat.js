import mongoose from "mongoose";

const HealthStatSchema = new mongoose.Schema(
  {
    weight: {
      type: Number,
      required: true,
    },
    neck: {
      type: Number,
      required: true,
    },
    waist: {
      type: Number,
      requried: true,
    },
    bmi: {
      type: Number,
      requried: true,
    },
    bodyFat: {
      type: Number,
      required: true,
    },
    bmr: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const HealthStat = mongoose.model("HealthStat", HealthStatSchema);

export default HealthStat;
