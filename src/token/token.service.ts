import moment, { Moment } from "moment";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Token from "./token.model";
import { ITokenDoc } from "./token.interfaces";

import httpStatus from "http-status";
import { UserInterface } from "@/modules/user/user.interfaces";
import { config } from "@/config/config";
import { NextResponse } from "next/server";
import tokenTypes from "./token.types";


export const generateToken = (
  userId: string,
  expires: Moment,
  type: string
) => {
  const payload = {
    user: userId,
    createdAt: moment().unix(),
    expires: expires.unix(),
    type,
  };
  return jwt.sign(payload, config.jwt.secret);
};

export const saveToken = async (
  token: string,
  userId: string,
  expires: Moment,
  type: string,
  blacklisted: boolean = false
) => {
  const tokenData = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
  });

  return tokenData;
};

interface payload {
  user: string;
  createdAt: number;
  expires: number;
  type: string;
  iat: number;
}

export const verifyToken = async (token: string, type: string) => {
  const payload = jwt.verify(token, config.jwt.secret);

  if (typeof payload === "object" && payload !== null) {
    const tokenDoc = await Token.findOne({
      token,
      type,
      user: payload.user,
      blacklisted: false,
    });
    if (!tokenDoc) {
      return new NextResponse( JSON.stringify({message:"Token not found"}),{status:httpStatus.BAD_REQUEST});
    }
    return tokenDoc;
  }else{
    return new NextResponse( JSON.stringify({message:"bad user"}),{status:httpStatus.BAD_REQUEST});
  }
};

export const generateAuthTokens = async (user: UserInterface) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  );

  const refreshTokenExpires = moment().add(
    config.jwt.refreshExpirationDays,
    "days"
  );
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );
  await saveToken(
    refreshToken,
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};
