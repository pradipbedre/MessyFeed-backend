import User from "../models/User.js";
import Review from "../models/Review.js";
import { createError } from "../error.js";
import bcrypt from "bcryptjs";

//Update User
export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id);
    if (!user) return createError(404, "User not found!");
    if (req?.user?.id === user?.id) {
      const updatedUser = await User.findByIdAndUpdate(
        req?.user?.id,
        {
          $set: req?.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } else {
      return createError(403, "You can update only your Profile!");
    }
  } catch (err) {
    return err;
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id);
    if (!user) return createError(404, "User not found!");
    if (req?.user?.id === user?.id) {
      await User.findByIdAndDelete(req?.user?.id);
      res.status(200).json("The User has been deleted");
    } else {
      return createError(403, "You can delete only your Profile!");
    }
  } catch (err) {
    return err;
  }
};

//get an User
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id);
    if (!user) return createError(404, "User not found!");
    if (req.user.role === "admin" || req.user.id === user.id) {
      res.status(200).json(user);
    } else {
      return createError(
        403,
        "You are not authenticated to view this Profile!"
      );
    }
  } catch (err) {
    return err;
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return createError(404, "Review not found!");
    if (req.user.id === review.userId) {
      await Review.findByIdAndDelete(req.params.id);
      res.status(200).json("The Review has been deleted");
    } else {
      return createError(403, "You can delete only your Review!");
    }
  } catch (err) {
    return err;
  }
};

export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req?.user?.id);

    // Check if the current password is correct
    const validPassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!validPassword) {
      res.status(403).json("Invalid current password");
    }

    // Hash the new password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.newPassword, salt);

    // Update the user document with the new password
    await User.updateOne(
      { _id: user.id },
      { $set: { password: hashedPassword } }
    );
    res.status(200).json("Password changed successfully");
  } catch (err) {
    console.log("Error:", err.message);
    return err;
  }
};
