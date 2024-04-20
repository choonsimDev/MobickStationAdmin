import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import SideBar from "@/components/sidebar";

const StyledWrapper = Styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;s
`;

const LeftCommunity = Styled.div`
  width: 900px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LeftCommunityCategory = Styled.div`
  width: 900px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 20px;
  border-bottom: 1px solid lightblue;
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

const WriteButton = Styled.a`
  margin-left: auto;
  margin-right: 12px;
  padding: 10px 20px;
  background-color: #f6931a;
  font-size: 14px;
  color: white;
  font-weight: bold;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    background-color: #e5821a;
  }
`;
const LeftCommunityContentWrapper = Styled.div`
  width: 900px;
  height: 1100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  & :hover {
    background-color: #f5f5f5;
  }
`;

const LeftCommunityContents = Styled.a`
  width: 900px;
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid lightgray;
  color: black;
  text-decoration: none;

  & > div:nth-child(1) {
    width: 800px;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    & > div:nth-child(1) {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > div:nth-child(2) {
      width: 100px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid lightgray;
      cursor: pointer;
    }
    & > div:nth-child(3) {
      height: 50px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      cursor: pointer;
    }
    & > div:nth-child(4) {
      width: 50px;
      height: 50px;
      color: red;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
      cursor: pointer;
    }
  }
  & > div:nth-child(2) {
    width: 300px;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    & > div:nth-child(1) {
      width: 125px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > div:nth-child(2) {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    & > div:nth-child(3) {
      width: 125px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const LeftCommunityContentsPageButton = Styled.div`
  width: 900px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top: 1px solid lightgray;
  & > span {
    margin: 0 5px; /* 페이지 번호 사이의 간격 */
    padding: 5px 10px; /* 페이지 번호의 패딩 */
    cursor: pointer;
    user-select: none; /* 텍스트 선택 방지 */
  }

  & > span:hover {
    background-color: #ddd; /* 호버 시 배경색 변경 */
  }
  & > .next {
    display: inline-block;
    width: 30px; /* 다음 버튼의 너비 */
    height: 30px; /* 다음 버튼의 높이 */
    line-height: 30px; /* 세로 정렬을 위해 높이와 동일하게 설정 */
    text-align: center; /* 텍스트 중앙 정렬 */
    cursor: pointer;
    user-select: none;
  }
  & > .next:hover {
    background-color: #ddd;
  }
`;
const StyledBack = Styled.a`
  top: 20px;
  left: 20px;
  font-size: 1.5rem;
  font-weight: bold;
  color: #999999;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function Community() {
  const [posts, setPosts] = useState([]); // 상태를 추가

  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);

    // 개별 구성요소를 추출
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth()는 0부터 시작하므로 +1 필요
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // 포맷에 맞게 조합
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/dbNotice/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "POST" }),
      });
      const data = await response.json();

      // 날짜를 기준으로 내림차순 정렬
      const sortedData = data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      // 최대 14개의 게시글만 선택
      setPosts(sortedData.slice(0, 20));
    }
    fetchPosts();
  }, []);

  return (
    <StyledWrapper>
      <SideBar />
      <LeftCommunity>
        <LeftCommunityCategory>
          공지사항 게시판
          <WriteButton href="/notice/write">글쓰기</WriteButton>
        </LeftCommunityCategory>

        <LeftCommunityContentWrapper>
          {posts.map(
            (
              post,
              index // API에서 가져온 데이터를 매핑하여 표시
            ) => (
              <LeftCommunityContents href={`/writing/${post.id}`} key={index}>
                <div>
                  <div>{post.id}</div>
                  <div>image</div>
                  <div>{post.title}</div>
                </div>
                <div>
                  <div>{post.nickname}</div>
                  <div>{post.thumb}</div>
                  <div>{formatDateTime(post.createdAt)}</div>
                </div>
              </LeftCommunityContents>
            )
          )}
        </LeftCommunityContentWrapper>
        <LeftCommunityContentsPageButton>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
          <span>7</span>
          <span>8</span>
          <span>10</span>
          <span className="next">▶</span>
        </LeftCommunityContentsPageButton>
      </LeftCommunity>
    </StyledWrapper>
  );
}
