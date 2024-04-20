import React from "react";
import Head from "next/head";
import Styled from "styled-components";
import { useState } from "react";

const NoticeWrapper = Styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: lightgray;
`;

const EditorWrapper = Styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
`;
const ButtonWrapper = Styled.div`
  width: 100%;
 
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const SaveButton = Styled.div`
  width: 100px;
  height: 40px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f6931a;
  font-size: 14px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #e5821a;
  }
`;
const StyledBack = Styled.a`
  margin-top: 30px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #999999;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
const AuthorInfoBox = Styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
`;
const AuthorInfo = Styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  input {
    width: 300px;
    height: 30px;
    padding: 0 10px;
    border: 1px solid #999999;
    border-radius: 5px;
    font-size: 1rem;
    color: #333333;
  }
`;
const Title = Styled.div`
  width: 610px;
  height: 40px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333;
  input {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    border: 1px solid #999999;
    border-radius: 5px;
    font-size: 1.5rem;
    color: #333333;
  }
`;

export default function WriteNotice() {
  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");

  const ChangeTitle = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  const ChangeNickname = (e) => {
    setNickname(e.target.value);
    console.log(nickname);
  };
  const SaveToDB = async () => {
    console.log(title, nickname, content);
    try {
      const response = await fetch("/api/setAdminPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          nickname: nickname,
          content: content,
        }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (e) {
      console.log(e);
    }
    setTitle("");
    setNickname("");
    setContent("");
    alert("공지글이 등록되었습니다.");
  };

  return (
    <NoticeWrapper>
      <Head>
        <title>공지 - 관리자</title>
      </Head>
      <AuthorInfoBox>
        <AuthorInfo>
          <input
            placeholder="작성자"
            value={nickname}
            onChange={ChangeNickname}
          ></input>
        </AuthorInfo>
        <Title>
          <input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={ChangeTitle}
          ></input>
        </Title>
      </AuthorInfoBox>
      <EditorWrapper>
        {/* <TextEditor GetContent={GetContent} /> */}
        <textarea
          placeholder="내용을 입력해주세요."
          style={{
            width: "610px",
            height: "610px",
            padding: "10px",
            border: "1px solid #999999",
            borderRadius: "5px",
            fontSize: "1rem",
            color: "#333333",
          }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <ButtonWrapper>
          <SaveButton onClick={SaveToDB}>save</SaveButton>
        </ButtonWrapper>
        <StyledBack href="/">돌아가기</StyledBack>
      </EditorWrapper>
    </NoticeWrapper>
  );
}
