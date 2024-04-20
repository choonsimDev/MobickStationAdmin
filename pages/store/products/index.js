"use client";
export default function Write() {
  return (
    <div className="p-20">
      <h4>글작성</h4>
      <form action="/api/post/new" method="POST">
        <input name="title" placeholder="글제목" />
        <input name="content" placeholder="글내용" />
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            let file = e.target.files[0];
            let filename = encodeURIComponent(file.name);
            let res = await fetch("/api/store/products/image?file=" + filename);
            res = await res.json();
          }}
        />
        <button type="submit">전송</button>
      </form>

      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          let file = e.target.files[0];
          let filename = encodeURIComponent(file.name);
          let res = await fetch("/api/store/products/image?file=" + filename);
          res = await res.json();
        }}
      />
      <img />
    </div>
  );
}
