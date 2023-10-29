
import { NextRequest, NextResponse } from "next/server";



import { loginUserWithEmailAndPassword } from "@/modules/auth/auth.service";
import { middleware } from "@/middleware";



export async function POST(req: Request, res: Response) {

    const data = await req.json();
    const user = await loginUserWithEmailAndPassword(data.email,data.password) 

    
    
    return new Response(JSON.stringify(user),{status:200});
  }