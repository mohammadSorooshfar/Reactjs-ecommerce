import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToEditList } from "redux/products";
import { IPriceManagement } from "types/interfaces.types";

interface props {
  rowData: IPriceManagement;
  handleChangePriceInventory: any;
}

const TrPrice: React.FC<props> = ({ rowData, handleChangePriceInventory }) => {
  const [editablePrice, setEditablePrice] = useState(false);
  const [editableInventory, setEditableInventory] = useState(false);
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
        {editablePrice ? (
          <TextField
            name="price"
            defaultValue={rowData.price}
            onChange={handleChange}
          />
        ) : (
          <Typography
            onClick={() => {
              !(editableInventory && editablePrice) &&
                dispatch(addToEditList(rowData.id));
              setEditablePrice(true);
            }}
          >
            {rowData.price}
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        {editableInventory ? (
          <TextField
            name="inventory"
            defaultValue={rowData.inventory}
            onChange={handleChange}
          />
        ) : (
          <Typography
            onClick={() => {
              !(editableInventory && editablePrice) &&
                dispatch(addToEditList(rowData.id));
              setEditableInventory(true);
            }}
          >
            {rowData.inventory}
          </Typography>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TrPrice;
