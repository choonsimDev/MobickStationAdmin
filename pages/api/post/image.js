import aws from "aws-sdk";
export default async function handler(요청, 응답) {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET_NAME,
    Fields: { key: 요청.query.file },
    Expires: 60, // seconds
    Conditions: [
      ["content-length-range", 0, 2621440], //파일용량 2.5MB 까지 제한
    ],
  });

  응답.status(200).json(url);
}
