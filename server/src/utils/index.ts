import axios from "axios";
import bcrypt from "bcryptjs";
import * as cheerio from "cheerio";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function hashPassword(password: string) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

export async function comparePassword(password: string, hashPassword: string) {
  const isCorrect = await bcrypt.compare(password, hashPassword);
  return isCorrect;
}

export function generateToken(payload: { user_id: unknown }) {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string);
  return token;
}

export function decodeToken(token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  return payload;
}

export const fetchUrlTitle = async (url: string) => {
  try {
    const res = await axios.get(url);
    const html = res.data;
    const $ = cheerio.load(html);
    const title = $("title").text();
    return title || null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
