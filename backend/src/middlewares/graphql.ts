// utils/errors
import { TokenVerifierError } from "@/utils/errors/index";
// utils/generators
import { verifyToken } from "@/utils/generators/jwt";
// utils/models
import { getAdmin } from "@/utils/models/admin";
import { getUser } from "@/utils/models/user";

export const adminContext = async (req: any) => {
  try {
    const [_, token] = String(req.headers["authorization"])?.split(" ");

    if (!token) {
      throw new TokenVerifierError("Sign-in Admin and pass token");
    }

    const { data, error, success } = verifyToken(token);

    if (!success) {
      throw error;
    }

    const { _id, email } = data;

    const adminExists = await getAdmin({ _id, email });

    if (!adminExists.success) {
      throw new TokenVerifierError("Invalid token for Admin");
    }

    req.admin = { email, _id };

    return { req, admin: { email, _id } };
  } catch (error) {
    throw error;
  }
};

export const userContext = async (req: any) => {
  try {
    const [_, token] = String(req.headers["authorization"])?.split(" ");

    if (!token) {
      throw new TokenVerifierError("Sign-in User and pass token");
    }

    const { data, error, success } = verifyToken(token);

    if (!success) {
      throw error;
    }

    const { _id, email } = data;

    const userExists = await getUser({ _id, email });

    if (!userExists.success) {
      throw new TokenVerifierError("Invalid token for User");
    }

    req.user = { email, _id };

    return { req, user: { email, _id } };
  } catch (error) {
    throw error;
  }
};
