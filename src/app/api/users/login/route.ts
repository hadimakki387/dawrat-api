import { loginUserWithEmailAndPassword } from "@/modules/auth/auth.service";

export async function POST(req: Request, res: Response) {
  const data = await req.json();
  return await loginUserWithEmailAndPassword(data.email, data.password);
}
