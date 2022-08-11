import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import { IOrderManagement } from "types/interfaces.types";

const TrOrder: React.FC<{ rowData: IOrderManagement }> = ({ rowData }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={rowData.id}>
      <TableCell align="right">{rowData.name}</TableCell>
      <TableCell align="right">{rowData.totalPrice}</TableCell>
      <TableCell align="right">{rowData.orderSubmitDate}</TableCell>
      <TableCell align="right">
        <Button>بررسی سفارش</Button>
      </TableCell>
    </TableRow>
  );
};

export default TrOrder;
