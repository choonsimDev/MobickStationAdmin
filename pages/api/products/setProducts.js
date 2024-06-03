import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  if (req.method === "POST") {
    const { name, price, discountPrice, description, detailDescription, imageUrl, inventory, categoryId, storeId } =
      req.body;

    console.log("Category ID:", categoryId);
    console.log("Store ID:", storeId);
    console.log("Product Name:", name);
    console.log("Price:", price);
    console.log("Description:", description);
    console.log("Detail Description:", detailDescription);
    console.log("Discount Price:", discountPrice);
    console.log("Image URL:", imageUrl);
    console.log("Inventory:", inventory);

    try {
      const product = await prisma.dbStoreProduct.create({
        data: {
          name,
          price,
          discountPrice,
          description,
          detailDescription,
          imageUrl: imageUrl.join(","), // 이미지 URL 배열을 콤마로 구분된 문자열로 저장
          inventory,
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