// authMiddleware.ts

import passport from "passport";
import { NextApiResponse, NextApiRequest } from "next";

import { UserInterface } from "../user/user.interfaces";
import jwtStrategy from "./passport";
import { roleRights } from "@/config/role";
import { ApiError } from "@/errors";

export const verifyCallback =
  (req: NextApiRequest, resolve: any, reject: any, requiredRights: string[]) =>
  async (err: Error, user: UserInterface, info: string) => {
    if (err || info || !user) {
      return reject({ statusCode: 401, message: "Please authenticate" });
    }
    req.body = user;

    if (requiredRights.length) {
      const userRights = roleRights.get(user.role);
      if (!userRights) return reject({ statusCode: 403, message: "Forbidden" });
      const hasRequiredRights = requiredRights.every((requiredRight: string) =>
        userRights.includes(requiredRight)
      );
      if (!hasRequiredRights && req.query.userId !== user.id) {
        return reject({ statusCode: 403, message: "Forbidden" });
      }
    }

    resolve();
  };



const authMiddleware =
  (...requiredRights: string[]) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    return new Promise<void>((resolve, reject) => {
      passport.authenticate(
        "jwt",
        { session: false },
        verifyCallback(req, resolve, reject, requiredRights)
      )(req, res);
    })
      .then(() => {
        // Authentication successful, proceed to the route handler
      })
      .catch((err) => {
        // Handle authentication errors and send an appropriate response
        return new ApiError(err.statusCode || 500, err.message || "Internal Server Error")

      });
  };

export default authMiddleware;
