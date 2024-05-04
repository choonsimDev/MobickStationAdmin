import React, { useState, useRef } from "react";
import styled from "styled-components"; // Add this line

const WriteWrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 500px;
`;

const StyledInput = styled.input`
  padding: 8px 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
`;

const StyledTextArea = styled.textarea`
  padding: 8px 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  height: 100px;
  font-size: 16px;
  resize: none; // Disables resizing
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImagePreview = styled.img`
  margin-top: 20px;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
`;

const SuccessMessage = styled.p`
  color: green;
  font-size: 16px;
`;

export default function Write() {
  const [files, setFiles] = useState([]); // 파일 배열 상태 추가
  const [srcs, setSrcs] = useState([]); // 파일 미리보기 URL 배열 상태 설정
  const fileInputRef = useRef();
  const [uploadResult, setUploadResult] = useState("");

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // 선택된 파일들을 배열로 변환
    if (files.length > 0) {
      setFiles(files); // 파일 배열을 상태로 저장
      setSrcs(files.map((file) => URL.createObjectURL(file))); // 각 파일에 대한 미리보기 URL 생성
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const price = parseFloat(event.target.price.value);
    const description = event.target.description.value;
    const categoryId = parseInt(event.target.categoryId.value);
    const storeId = parseInt(event.target.storeId.value);

    if (files.length > 0) {
      const uploadedUrl = await uploadFiles(files); // 다중 파일 업로드 함수 호출

      const productResponse = await fetch("/api/products/setProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          price,
          description,
          imageUrl: uploadedUrl, // 업로드된 이미지 URL 배열
          categoryId,
          storeId,
        }),
      });

      if (productResponse.ok) {
        console.log("Product successfully registered.");
        setUploadResult("Product successfully registered.");
      } else {
        console.log("Product registration failed.");
        setUploadResult("Product registration failed.");
      }
    }
  };

  async function uploadFiles(files) {
    const urls = [];

    for (const file of files) {
      // Presigned URL을 생성하는 서버 엔드포인트 호출
      const presignResponse = await fetch(
        `/api/post/image?file=${encodeURIComponent(file.name)}`
      );
      const { url, fields } = await presignResponse.json();

      // FormData 객체를 생성하고, 필드와 파일을 추가
      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      // Presigned URL을 사용해 파일 업로드
      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("Failed to upload file.");

      // 업로드된 파일의 URL을 배열에 추가
      // 주의: 실제 파일 URL을 구성하려면 업로드 응답에서 URL을 추출하거나
      // S3 버킷의 기본 URL과 파일 경로를 조합해야 할 수 있습니다.
      const uploadedUrl = `https://${fields.bucket}.s3.amazonaws.com/${fields.key}`;
      urls.push(uploadedUrl);
    }

    return urls;
  }

  return (
    <WriteWrapper>
      <h4>Add New Product</h4>
      <StyledForm onSubmit={handleSubmit}>
        <StyledInput name="title" placeholder="Product Name" />
        <StyledInput name="price" type="number" placeholder="Price" />
        <StyledTextArea name="description" placeholder="Description" />
        <StyledInput
          name="categoryId"
          type="number"
          placeholder="Category ID"
        />
        <StyledInput name="storeId" type="number" placeholder="Store ID" />
        <StyledInput
          type="file"
          accept="image/*"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
      {srcs.map((src, index) => (
        <ImagePreview key={index} src={src} alt="Preview" />
      ))}
      {uploadResult && <SuccessMessage>{uploadResult}</SuccessMessage>}
    </WriteWrapper>
  );
}
