const mongoose = require("mongoose");
const { Schema } = mongoose;

const RecommendationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    assessmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },
    recommendationId: {
      // Unique ID for the recommendation, can be a UUID from frontend
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "diet",
        "exercise",
        "lifestyle",
        "medication",
        "monitoring",
        "general",
      ],
      required: true,
    },
    advice: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },
    generatedAt: {
      type: Date,
      default: Date.now,
    },
    // Potentially add a 'source' field if recommendations come from different places (e.g., AI, manual)
    source: { type: String, enum: ["ai", "manual"], default: "ai" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recommendation", RecommendationSchema);
