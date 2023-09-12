import dbconn from "../db/dbconn";
import Pc from "../models/pc";

const handler = async (req, res) => {
    dbconn()
  const { method } = req;

  switch (method) {

    case "POST": 
    try {

      // Create a new user with the hashed password
      const pc = await Pc.create({...req.body});

      if (!pc) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      return res.status(200).json(pc);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    case "GET":
      try {
        const pc = await Pc.find().populate("customer");
        if (!pc) {
          return res.status(400).json({ message: "No pc Found" });
        }
        return res.status(200).json(pc);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case "DELETE":
      try {
        const delPc = await Pc.findByIdAndDelete(req.query.id);

        if (!delPc) {
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
