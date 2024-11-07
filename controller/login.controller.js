import { Admin, Super } from "../models/index.js";
import { createTokens } from "../helpers/jwt.js";


export async function loginUser(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Please enter all fields!");

    const admin = await Admin.find(email,password)
    const superAdmin = await Super.find(email, password);

    if (!admin.rows[0] || !superAdmin.rows[0]) {
      return res.status(400).send("Parol yoki email xato!");
    }

    if (admin.rows[0]) {
        const token = createTokens({
          email: admin.rows[0].email,
        });
        res.status(200).send({
          message: "SignIn",
          token,
        });
    } else {
         const token = createTokens({
           email: Super.rows[0].email,
         });
         res.status(200).send({
           message: "SignIn",
           token,
         });
    }

  } catch (error) {
    next(error);
  }
}
