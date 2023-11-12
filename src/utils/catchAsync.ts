import { NextResponse } from "next/server";


const catchAsync = (fn: any) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res)).catch((err) => NextResponse.next(err));
};

export default catchAsync;
