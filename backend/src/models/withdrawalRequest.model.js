import mongoose from "mongoose";

const withdrawalRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who requested the withdrawal
  bkashNumber: { type: String, required: true }, // Bkash number for withdrawal
  coin: { type: Number, required: true }, // Amount of coins to withdraw
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "",
  }, // Status of the request
  createdAt: { type: Date, default: Date.now }, // Timestamp of the request
});

const WithdrawalRequest = mongoose.model(
  "WithdrawalRequest",
  withdrawalRequestSchema
);
export default WithdrawalRequest;
