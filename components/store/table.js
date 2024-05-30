import React from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
`;

const TableHead = styled.thead`
  background-color: #f4f4f4;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const TableData = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
`;

const ProductTable = () => {
    const data = [
        { id: 1, name: 'Product 1', price: 100, status: 'Available', stock: 20, createdAt: '2023-05-01', updatedAt: '2023-05-10' },
        { id: 2, name: 'Product 2', price: 200, status: 'Unavailable', stock: 0, createdAt: '2023-04-15', updatedAt: '2023-05-08' },
        // 더미 데이터 추가 가능
    ];

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableHeader>상품번호</TableHeader>
                    <TableHeader>상품명</TableHeader>
                    <TableHeader>가격</TableHeader>
                    <TableHeader>상태</TableHeader>
                    <TableHeader>재고</TableHeader>
                    <TableHeader>등록일</TableHeader>
                    <TableHeader>수정일</TableHeader>
                </TableRow>
            </TableHead>
            <tbody>
                {data.map((product) => (
                    <TableRow key={product.id}>
                        <TableData>{product.id}</TableData>
                        <TableData>{product.name}</TableData>
                        <TableData>{product.price}</TableData>
                        <TableData>{product.status}</TableData>
                        <TableData>{product.stock}</TableData>
                        <TableData>{product.createdAt}</TableData>
                        <TableData>{product.updatedAt}</TableData>
                    </TableRow>
                ))}
            </tbody>
        </Table>
    );
};

export default ProductTable;
