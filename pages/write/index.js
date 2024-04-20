import { useState, useRef } from "react";

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
        setUploadResult(data.url + "/" + filename);
        // 이제 여기서 글 제목, 내용과 함께 이미지 URL을 전송할 수 있습니다.
        const title = event.target.title.value;
        const content = event.target.content.value;
        const imageURL = data.url + "/" + filename;

        const postResponse = await fetch("/api/post/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, content, imageURL }),
        });

        if (postResponse.ok) {
          console.log("글과 이미지가 성공적으로 등록되었습니다.");
        } else {
          console.log("글 등록 실패");
        }
      } else {
        console.log("이미지 업로드 실패");
      }
    }
  };

  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button type="submit">전송</button>
      </form>
      {src && <img src={src} alt="Preview" />}
      {uploadResult && <p>Image uploaded successfully: {uploadResult}</p>}
    </div>
  );
}
