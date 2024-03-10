import { loginUserWithEmailAndPassword } from "@/backend/modules/auth/auth.service";


export async function POST(req: Request) {
  const data = await req.json();
  return await loginUserWithEmailAndPassword(data.email, data.password);
}
