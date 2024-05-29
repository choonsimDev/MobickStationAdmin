import React, { useEffect, useState } from "react";
import styled from "styled-components";

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
  overflow-x: auto; // 넓은 테이블 스크롤 가능
`;

const OrderTable = styled.table`
  width: 100%;
  border-collapse: collapse; // 테이블 셀 사이의 간격 제거
  margin-top: 20px;
  background-color: #fff;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2; // 짝수 행에 대한 배경색 설정
  }

  &:hover {
    background-color: #e8f4e8; // 행에 마우스를 올렸을 때의 배경색
  }
`;

const HeaderCell = styled.th`
  background-color: #4caf50; // 헤더 셀 배경색
  color: white;
  padding: 8px 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Cell = styled.td`
  text-align: left;
  padding: 8px 10px;
  border: 1px solid #ddd; // 테두리 적용
`;
export default function Community() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // async function fetchOrders() {
    //   const response = await fetch("/api/store/orders/orders", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ name: "POST" }),
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    //   const data = await response.json();
    //   setOrders(data);
    // }
    // fetchOrders();
  }, []);

  return (
    <OrderWrapper>
      <OrderTable>
        <thead>
          <tr>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Order ID</HeaderCell>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>Status</HeaderCell>
            <HeaderCell>Total</HeaderCell>
            <HeaderCell>Created At</HeaderCell>
            <HeaderCell>Customer Info</HeaderCell>
            <HeaderCell>Customer Name</HeaderCell>
            <HeaderCell>Phone</HeaderCell>
            <HeaderCell>Email</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Contact1</HeaderCell>
            <HeaderCell>Contact2</HeaderCell>
            <HeaderCell>Address</HeaderCell>
            <HeaderCell>Delivery Note</HeaderCell>
            <HeaderCell>Payment Method</HeaderCell>
            <HeaderCell>Password</HeaderCell>
            <HeaderCell>Order</HeaderCell>
          </tr>
        </thead>
        {/* <tbody>
          {orders.map((order, index) => (
            <TableRow key={index}>
              <Cell>{order.id}</Cell>
              <Cell>{order.orderId}</Cell>
              <Cell>{order.orderName}</Cell>
              <Cell>{order.status}</Cell>
              <Cell>{order.total}</Cell>
              <Cell>{order.createdAt}</Cell>
              <Cell>{order.customerInfo?.id}</Cell>
              <Cell>{order.customerInfo?.name}</Cell>
              <Cell>{order.customerInfo?.phone}</Cell>
              <Cell>{order.customerInfo?.email}</Cell>
              <Cell>{order.customerInfo?.recipient}</Cell>
              <Cell>{order.customerInfo?.contact1}</Cell>
              <Cell>{order.customerInfo?.contact2}</Cell>
              <Cell>{order.customerInfo?.address}</Cell>
              <Cell>{order.customerInfo?.deliveryNote}</Cell>
              <Cell>{order.customerInfo?.paymentMethod}</Cell>
              <Cell>{order.customerInfo?.password}</Cell>
              <Cell>{order.customerInfo?.order}</Cell>
            </TableRow>
          ))}
        </tbody> */}
      </OrderTable>
    </OrderWrapper>
  );
}
