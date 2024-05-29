import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { name, price, description, imageUrl, categoryId, storeId } =
      req.body;
    try {
      const product = await prisma.dbStoreProduct.create({
        data: {
          name,
          price,
          description,
          imageUrl: imageUrl.join(","), // 이미지 URL 배열을 콤마로 구분된 문자열로 저장
          categoryId,
          storeId,
        },
      });
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end("Method Not Allowed");
  }
}