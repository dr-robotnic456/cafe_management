import mongoose from "mongoose";
import Users from "../models/users";
import dbconn from "../db/dbconn";

const handler = async (req, res) => {
    dbconn()
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const user = await Users.findById(req.query.id);
        if (!user) {
          return res.status(400).json({ message: "User Does not Exist" });
        } else {
          // return user data
          return res.status(200).json(user);
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case "DELETE":
      try {
        const delUser = await Users.findByIdAndDelete(req.query.id);

        if (!delUser) {
          return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({ message: "User deleted successfully" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case "PUT":
      const { id } = req.query;
      try {
        // check if provided id is correct
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid user ID" });
        }

        const updateUser = await Users.findByIdAndUpdate(id, req.body, {
          new: true, // return updated user
          runValidators: true
        });

        if (!updateUser) {
          return res.status(400).json({ message: "User not found" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      return res.status(200).json(updateUser);

    default:
      break;
  }
};

export default handler;
