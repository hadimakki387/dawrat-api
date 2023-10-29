
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import * as userServices from "./user.service";


export const createUser = catchAsync(async (req: any, res: any) => {
  const user = await userServices.createUser(req);
  return user
});

export const getUSer = async (req: Request, res: Response) => {
  return new Response('hello',{status:200})
};
