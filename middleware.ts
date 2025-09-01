import jwt from "jsonwebtoken";

function verifyAuth(req: Request): string | null {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;

  const token = authHeader
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    return decoded.userId;
  } catch {
    return null;
  }
}
export default verifyAuth