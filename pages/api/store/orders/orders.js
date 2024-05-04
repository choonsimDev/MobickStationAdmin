import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function handler(req, res) {
  try {
    const data = await client.dbOrder.findMany({
      include: {
        customerInfo: true, // customerInfo는 선택적 필드이므로 존재하지 않을 수도 있음
      },
    });
    console.log("Retrieved data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching orders with customer info:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
}
