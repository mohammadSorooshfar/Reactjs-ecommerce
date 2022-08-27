import React, { useState } from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import { IOrder, IOrderManagement } from "types/interfaces.types";
import OrderModal from "components/modals/OrderModal";
import { useSelector } from "react-redux";

const TrOrder: React.FC<{ rowData: IOrderManagement }> = ({ rowData }) => {
  const [openModal, setOpenModal] = useState(false);
  const orders = useSelector((state: any) => state.orders.orders);
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={rowData.id}>
        <TableCell align="right">{rowData.name}</TableCell>
        <TableCell align="right">{rowData.totalPrice}</TableCell>
        <TableCell align="right">{rowData.orderSubmitDate}</TableCell>
        <TableCell align="right">
          <Button onClick={() => setOpenModal(true)}>بررسی سفارش</Button>
        </TableCell>
      </TableRow>
      <OrderModal
        open={openModal}
        setOpen={setOpenModal}
        order={orders.find((order: IOrder) => order.id === rowData.id)}
        key={rowData.id}
      />
    </>
  );
};

export default TrOrder;
