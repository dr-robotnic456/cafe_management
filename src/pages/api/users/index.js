import { hash } from "bcrypt";
import dbconn from "../db/dbconn";
import Users from "../models/users";

const handler = async (req, res) => {
    dbconn()
  const { method } = req;

  switch (method) {

    case "POST": 
    try {
      // Check if the request body contains the required fields
      const { name, email, password } = req.body;
      if (!name || !email || !password ) {
        return res.status(400).json({ message: "Please provide all required fields" });
      }

      // Hash the password
      const hashedPassword = await hash(password, 10);

      // Create a new user with the hashed password
      const user = await Users.create({
        name,
        email,
        password: hashedPassword
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    case "GET":
      try {
        const users = await Users.find();
        if (!users) {
          return res.status(400).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
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

    default:
      break;
  }
};

export default handler;
