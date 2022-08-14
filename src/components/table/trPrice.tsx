import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { editableToggle } from "redux/products";
import { IPriceManagement } from "types/interfaces.types";

interface props {
  rowData: IPriceManagement;
  handleChangePriceInventory: any;
}

const TrPrice: React.FC<props> = ({ rowData, handleChangePriceInventory }) => {
  const editable = useSelector((state: any) => state.products.editable);
  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    handleChangePriceInventory(
      e.currentTarget.value,
      rowData.id,
      e.currentTarget.name
    );
  };
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
      <TableCell align="right">{rowData.name}</TableCell>
      <TableCell align="right">
        {editable ? (
          <TextField
            name="price"
            defaultValue={rowData.price}
            onChange={handleChange}
          />
        ) : (
          <Typography onClick={() => dispatch(editableToggle())}>
            {rowData.price}
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        {editable ? (
          <TextField
            name="inventory"
            defaultValue={rowData.inventory}
            onChange={handleChange}
          />
        ) : (
          <Typography onClick={() => dispatch(editableToggle())}>
            {" "}
            {rowData.inventory}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TrPrice;
