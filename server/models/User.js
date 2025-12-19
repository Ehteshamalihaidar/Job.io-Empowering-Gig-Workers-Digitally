import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    // 🔐 AUTH INFO
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },

    // 👤 ROLE
    role: {
      type: String,
      enum: ["worker", "employer"],
      default: "worker"
    },

    // 🧾 PROFILE DETAILS (NEW)
    gender: {
      type: String,
      enum: ["male", "female", "other"]
    },
    age: {
      type: Number,
      min: 16,
      max: 100
    },
    profession: {
      type: String,
      trim: true
    },
    experience: {
      type: Number,
      min: 0,
      max: 50
    },
    location: {
      type: String,
      trim: true
    },
    bio: {
      type: String,
      maxlength: 300
    }
  },
  { timestamps: true }
);

// 🔐 Hash password
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// 🔍 Compare password
UserSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
