import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import { IPriceManagement } from "types/interfaces.types";

const TrPrice: React.FC<{ rowData: IPriceManagement }> = ({ rowData }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
      <TableCell align="right">{rowData.name}</TableCell>
      <TableCell align="right">{rowData.price}</TableCell>
      <TableCell align="right">{rowData.inventory}</TableCell>
    </TableRow>
  );
};

export default TrPrice;
