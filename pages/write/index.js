import { useState, useRef } from "react";
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
  const [file, setFile] = useState(null);
  const [src, setSrc] = useState("");
  const [uploadResult, setUploadResult] = useState("");

  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const newFile = event.target.files[0];
    if (newFile) {
      setFile(newFile);
      setSrc(URL.createObjectURL(newFile));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const price = parseFloat(event.target.price.value);
    const description = event.target.description.value;
    const categoryId = parseInt(event.target.categoryId.value); // Assuming a valid ID is entered
    const storeId = parseInt(event.target.storeId.value); // Assuming a valid ID is entered

    if (file) {
      const filename = encodeURIComponent(file.name);
      const res = await fetch("/api/post/image?file=" + filename);
      const data = await res.json();

      const formData = new FormData();
      Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const uploadResponse = await fetch(data.url, {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const imageURL = data.url + "/" + filename;
        const productResponse = await fetch("/api/products/setProducts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: title,
            price,
            description,
            imageURL,
            categoryId,
            storeId,
          }),
        });

        if (productResponse.ok) {
          console.log("Product successfully registered.");
        } else {
          console.log("Product registration failed.");
        }
      } else {
        console.log("Image upload failed");
      }
    }
  };

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
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <StyledButton type="submit">Submit</StyledButton>
      </StyledForm>
      {src && <ImagePreview src={src} alt="Preview" />}
      {uploadResult && (
        <SuccessMessage>
          Image uploaded successfully:{uploadResult}
        </SuccessMessage>
      )}
    </WriteWrapper>
  );
}
