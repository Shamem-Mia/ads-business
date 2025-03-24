import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import fs from "fs";
import WithdrawalRequest from "../models/withdrawalRequest.model.js";
import { log } from "console";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    if (password.length < 4) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 4 characters!",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "This email is already used! Please use another email.",
      });
    }

    // Find the last user's PIN or start with 25300 if no users exist
    const lastUser = await User.findOne().sort({ pin: -1 });
    const newPin = lastUser ? lastUser.pin + 1 : 25300;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      pin: newPin, // Assign the new PIN
    });

    if (newUser) {
      // Create JWT token
      generateToken(newUser._id, res);
      const result = await newUser.save();
      return res.status(201).json({
        success: true,
        message: "Successfully signed up!",
        data: result,
      });
    }

    res.status(400).json({
      message: "Invalid user data!",
    });
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist! Please signup first",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Wrong password!",
      });
    }
    generateToken(existingUser._id, res);

    return res.status(200).json({
      success: true,
      message: "successfully logged in!",
      data: existingUser,
    });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { magAge: 0 });
    res.status(200).json({
      message: "successfully logged out!",
    });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({
      message: "Internal server error!",
    });
  }
};

// export const updateProfile = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const profilePic = req.file;

//     if (!profilePic) {
//       return res.status(400).json({
//         message: "Profile pic is required!",
//       });
//     }

//     const uploadResult = await cloudinary.uploader.upload(profilePic.path);
//     console.log(uploadResult);

//     const updatedUser = await User.findByIdAndUpdate(
//       userId, // Ensure `req.user.id` exists (via authMiddleware)
//       { profilePic: uploadResult.secure_url },
//       { new: true } // Return updated user
//     );

//     fs.unlink(req.file.path, (err) => {
//       if (err) console.log(err);
//       else {
//         console.log("\nDeleted file");
//       }
//     });

//     res.json({
//       message: "Successfully uploaded",
//       profilePicUrl: updatedUser.profilePic, // Send updated profile picture URL
//       user: updatedUser,
//     });

//     // res.status(200).json(updatedUser);
//   } catch (error) {
//     console.log("Error in uploadProfile controller:", error);
//     res.status(500).json({
//       message: "Internal server error!",
//     });
//   }
// };

export const updateCoin = async (req, res) => {
  try {
    const { userId, coin } = req.body;

    // Find the user by ID and update their coin balance
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { coin: coin } }, // Increment the coin balance by the provided value
      { new: true } // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Coin balance updated successfully!",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating coin:", error);
    res.status(500).json({ message: "Failed to update coin", error: error });
  }
};

export const getCoinBalance = async (req, res) => {
  try {
    const userId = req.query.userId; // Get the user ID from the query params

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      success: true,
      message: "Coin balance fetched successfully!",
      coin: user.coin, // Return the coin balance
    });
  } catch (error) {
    console.error("Error fetching coin balance:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch coin balance", error: error });
  }
};

export const withdraw = async (req, res) => {
  try {
    const { userId, userPin, bkashNumber, coin } = req.body;

    const reqUserId = req.query.userId; // Get the user ID from the query params

    // Find the user by ID
    const reqUser = await User.findById(reqUserId);

    if (!reqUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    if (reqUser.role === "admin") {
      return res
        .status(404)
        .json({ message: "Admin can't request for withdraw!" });
    }

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Verify the PIN
    // if (user.pin !== userPin) {
    //   return res.status(400).json({ success: false, message: "Invalid PIN." });
    // }

    // Check if the user has enough coins
    if (user.coin < coin || coin < 3) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient coins." });
    }

    // Deduct the coins from the user's balance
    // user.coin -= coin;
    // await user.save();

    // Check if the user already has a pending withdrawal request
    const pendingRequest = await WithdrawalRequest.findOne({
      userId,
      status: "pending",
    });

    if (pendingRequest) {
      return res.status(400).json({
        success: false,
        message: "You already have a pending withdrawal request.",
      });
    }

    // Save the withdrawal request (you can create a separate model for withdrawal requests)
    const withdrawalRequest = new WithdrawalRequest({
      userId,
      bkashNumber,
      coin,
      status: "pending", // Set the status to pending
    });
    await withdrawalRequest.save();
    console.log("Withdrawal Request Saved:", withdrawalRequest);

    res.status(200).json({
      success: true,
      message: "Withdrawal request submitted successfully!",
    });
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to process withdrawal." });
  }
};

export const getAllWithdrawalRequests = async (req, res) => {
  try {
    // Fetch all withdrawal requests with "pending" status
    const withdrawalRequests = await WithdrawalRequest.find({
      status: "pending",
    })
      .populate("userId", "fullName email pin coin") // Populate user details
      .sort({ createdAt: -1 }); // Sort by latest requests first

    res.status(200).json({
      success: true,
      data: withdrawalRequests,
    });
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch withdrawal requests.",
    });
  }
};

export const updateWithdrawalRequest = async (req, res) => {
  try {
    const { requestId } = req.params; // Withdrawal request ID
    const { status } = req.body; // New status: "approved" or "rejected"

    // Find the withdrawal request
    const withdrawalRequest = await WithdrawalRequest.findById(
      requestId
    ).populate("userId", "fullName email pin coin");

    if (!withdrawalRequest) {
      return res
        .status(404)
        .json({ success: false, message: "Withdrawal request not found." });
    }

    // Update the status
    withdrawalRequest.status = status;
    await withdrawalRequest.save();

    // If the request is approved, deduct the coins from the user's balance
    if (status === "approved") {
      const user = await User.findById(withdrawalRequest.userId);
      if (user) {
        user.coin -= withdrawalRequest.coin;
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      message: `Withdrawal request ${status} successfully.`,
      data: withdrawalRequest,
    });
  } catch (error) {
    console.error("Error updating withdrawal request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update withdrawal request.",
    });
  }
};

export const searchUserByPin = async (req, res) => {
  try {
    const { pin } = req.query; // PIN number to search for

    // Find the user by PIN
    const user = await User.findOne({ pin });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error searching user by PIN:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to search user by PIN." });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
};
