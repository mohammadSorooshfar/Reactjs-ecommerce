import React from "react";
import {
  Avatar,
  Button,
  ButtonGroup,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import { IProduct } from "types/interfaces.types";

const TrOrder: React.FC<{ rowData: IProduct }> = ({ rowData }) => {
  const DeleteButton = styled(Button)<{}>(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  }));
  const EditButton = styled(Button)<{}>(({ theme }) => ({
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  }));
  return (
    <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
      <TableCell align="right">
        <Avatar
          variant="rounded"
          src={rowData.types[0].images[0]}
          sx={{ width: 56, height: 56 }}
        />
      </TableCell>
      <TableCell align="right">{rowData.name}</TableCell>
      <TableCell align="right">{`${rowData.gender}/${rowData.category}`}</TableCell>
      <TableCell align="right">
        <ButtonGroup
          disableElevation
          variant="contained"
          sx={{ flexDirection: "row-reverse" }}
        >
          <DeleteButton>حذف</DeleteButton>
          <EditButton>ویرایش</EditButton>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default TrOrder;
