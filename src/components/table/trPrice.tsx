import { TableCell, TableRow, TextField, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToEditList, changeEditList } from "redux/products";
import { IPriceManagement } from "types/interfaces.types";

interface props {
  rowData: IPriceManagement;
}

const TrPrice: React.FC<props> = ({ rowData }) => {
  const dispatch = useDispatch();
  const editList: { id: number; priceEdit: boolean; inventoryEdit: boolean }[] =
    useSelector((state: any) => state.products.editList);
  const edit = editList.find((product) => product.id === rowData.id);
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
      <TableCell align="right">{rowData.name}</TableCell>
      <TableCell align="right">
        {edit?.priceEdit ? (
          <TextField
            name="price"
            defaultValue={rowData.price}
            onBlur={(e) =>
              dispatch(
                changeEditList({
                  id: rowData.id,
                  data: { priceData: +e.target.value },
                })
              )
            }
          />
        ) : (
          <Typography
            onClick={() => {
              if (!edit) {
                dispatch(
                  addToEditList({
                    id: rowData.id,
                    priceEdit: true,
                    inventoryEdit: false,
                    priceData: +rowData.price,
                    inventoryData: 0,
                  })
                );
              } else {
                dispatch(
                  changeEditList({
                    id: rowData.id,
                    data: { priceEdit: true, priceData: +rowData.price },
                  })
                );
              }
            }}
          >
            {rowData.price}
          </Typography>
        )}
      </TableCell>
      <TableCell align="right">
        {edit?.inventoryEdit ? (
          <TextField
            name="inventory"
            defaultValue={rowData.inventory}
            onBlur={(e) =>
              dispatch(
                changeEditList({
                  id: rowData.id,
                  data: { inventoryData: +e.target.value },
                })
              )
            }
          />
        ) : (
          <Typography
            onClick={() => {
              if (!edit) {
                dispatch(
                  addToEditList({
                    id: rowData.id,
                    priceEdit: false,
                    inventoryEdit: true,
                    priceData: 0,
                    inventoryData: +rowData.inventory,
                  })
                );
              } else {
                dispatch(
                  changeEditList({
                    id: rowData.id,
                    data: {
                      inventoryEdit: true,
                      inventoryData: +rowData.inventory,
                    },
                  })
                );
              }
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
