// /pages/api/post/new.js
export default async function handler(req, res) {
  if (req.method === "POST") {
    // 클라이언트로부터 받은 데이터 처리
    const { title, content, imageURL } = req.body;

    // 데이터베이스에 데이터 저장 로직 구현 (예시로 MongoDB를 사용할 수 있음)
    // 여기서 실제 데이터베이스 연결과 저장 로직을 구현해야 함

    res
      .status(201)
      .json({
        message: "Post and image uploaded successfully",
        data: { title, content, imageURL },
      });
  } else {
    // POST 이외의 메소드 처리
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
