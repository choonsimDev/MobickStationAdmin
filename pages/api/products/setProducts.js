import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { name, price, description, imageURL, categoryId, storeId } =
      req.body;
    try {
      const product = await prisma.dbStoreProduct.create({
        data: {
          name,
          price,
          description,
          imageUrl: imageURL,
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
