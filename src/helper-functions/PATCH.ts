import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import httpStatus from 'http-status';

export function PatchMiddleware(request: NextApiRequest,res:NextApiResponse)  {
  if (request.method !== 'PATCH') {
    res.status(httpStatus.METHOD_NOT_ALLOWED).json({
        message:httpStatus['405_MESSAGE']
    })
    // (
    //   JSON.stringify({
    //     success: false,
    //     message: httpStatus['405_MESSAGE'],
    //   }),
    //   {
    //     status: httpStatus.METHOD_NOT_ALLOWED,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );
  }

  NextResponse.next()
}
