import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { title, nickname, content } = req.body;
    console.log("req.method", req.method);
    if (req.method === "POST") {
      const data = await client.dbNotice.create({
        data: {
          title: title,
          nickname: nickname,
          content: content,
        },
      });
      console.log("data", data);
      res.status(200).json({ ok: true });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
}
