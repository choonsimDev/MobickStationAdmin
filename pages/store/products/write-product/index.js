import React, { useState, useRef } from "react";
import styled from "styled-components";
import SideBar from "@/components/sidebar";

const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const WriteWrapper = styled.div`
  width: 100%; // 우측 화면이 90%를 차지하도록 수정
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: auto; // 내용이 많을 경우 스크롤 가능하도록 설정
`;
const StyledForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const StyledInput = styled.input`
  width: 40%;
  padding: 8px 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
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

const SuccessMessage = styled.p`
  color: green;
  font-size: 16px;
`;

const ProductImageUpload = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: row;
`;
const ImagePreview = styled.img`
  
  width: 100%;
  height: auto;
  border-radius: 4px;
`;
const ChooseFileArea = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
`;
const ChooseFileInput = styled.input`
 
  padding: 8px 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;
const ProductNameDescription = styled.div`
width: 40%;
display: flex;
flex-direction: column;
`;
const CategorySelect = styled.div`
width: 20%;
height: 100px;
`;

const ProductPrices = styled.div`
  display: flex;
  flex-direction: row;
`;
const DeliveryInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const InventoryManagement = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
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
    const price = event.target.price.value;
    const discountPrice = event.target.discountprice.value;
    const description = event.target.description.value;
    const detailDescription = event.target.DetailDescription.value;
    const categoryId = parseInt(event.target.categoryId.value);
    const storeId = parseInt(event.target.storeId.value);

    if (files.length > 0) {
      const uploadedUrl = await uploadFiles(files); // 다중 파일 업로드 함수 호출

      console.log("Uploaded URLs:", uploadedUrl);
      console.log("Category ID:", categoryId);
      console.log("Store ID:", storeId);
      console.log("Product Name:", title);
      console.log("Price:", price);
      console.log("Description:", description);
      console.log("Detail Description:", detailDescription);
      console.log("Discount Price:", discountPrice);

      const productResponse = await fetch("/api/products/setProducts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: title,
          price,
          discountPrice,
          description,
          detailDescription,
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

  // dbStoreProduct에 데이타 추가 할 것

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
    <StyledWrapper>
      <SideBar />
      <WriteWrapper>
        <h4>Add New Product</h4>
        <StyledForm onSubmit={handleSubmit}>
          <ProductImageUpload>
            <ChooseFileArea>
              {srcs.map((src, index) => (
                <ImagePreview key={index} src={src} alt="Preview" />
              ))}
              <ChooseFileInput
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </ChooseFileArea>
            <ProductNameDescription>
              <StyledInput name="title" placeholder="Product Name" />
              <StyledTextArea name="description" placeholder="Description" />
            </ProductNameDescription>
            <CategorySelect>
              <select name="category">
                <option value="1">Category 1</option>
                <option value="2">Category 2</option>
                <option value="3">Category 3</option>
              </select>
            </CategorySelect>
          </ProductImageUpload>
          <StyledTextArea name="DetailDescription" placeholder="DetailDescription" />
          <ProductPrices>
            <div>
              <div>판매가격</div>
              <StyledInput name="price" type="number" placeholder="Price" />
            </div>
            <div>
              <div>정가(할인)</div>
              <StyledInput name="discountprice" type="number" placeholder="discountPrice" />
            </div>
          </ProductPrices>
          <DeliveryInfo>
            <div>배송 및 택배</div>
            <StyledInput name="deliveryprice" type="number" placeholder="배송 및 택배" />
            <StyledTextArea name="deliverydescription" placeholder="deliveryDescription" />
          </DeliveryInfo>
          <InventoryManagement>
            <div>재고관리</div>
            <StyledInput name="inventory" type="number" placeholder="inventory" />
          </InventoryManagement>
          <StyledInput
            name="categoryId"
            type="number"
            placeholder="Category ID"
          />
          <StyledInput name="storeId" type="number" placeholder="Store ID" />
          <StyledButton type="submit">Submit</StyledButton>
        </StyledForm>

        {uploadResult && <SuccessMessage>{uploadResult}</SuccessMessage>}
      </WriteWrapper>
    </StyledWrapper >
  );
}
