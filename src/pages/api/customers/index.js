import dbconn from "../db/dbconn";
import Customer from "../models/customer";

const handler = async (req, res) => {
    dbconn()
  const { method } = req;

  switch (method) {

    case "POST": 
    try {

      // Create a new user with the hashed password
      const customer = await Customer.create({...req.body});

      if (!customer) {
        return res.status(400).json({ message: "Invalid Credentials" });
      }

      return res.status(200).json(customer);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    case "GET":
      try {
        const customer = await Customer.find();
        if (!customer) {
          return res.status(400).json({ message: "No customer Found" });
        }
        return res.status(200).json(customer);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

    case "DELETE":
      try {
        const delCustomer = await Customer.findByIdAndDelete(req.query.id);

        if (!delCustomer) {
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
