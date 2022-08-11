import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import TrProduct from "./TrProduct";
import { IOrderManagement, IProduct, TOrder } from "types/interfaces.types";
import { useLocation } from "react-router-dom";
import TrPrice from "./TrPrice";
import TrOrder from "./TrOrder";
import { getProductsAdminService } from "services/services";
// import { descendingComparator } from "utils/functions.util";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

interface ITableHeadProps {
  order?: TOrder;
  orderBy?: string;
  rowCount: number;
  headers: any[];
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IOrderManagement
  ) => void;
}

function EnhancedTableHead(props: ITableHeadProps) {
  const { order, orderBy, rowCount, onRequestSort, headers } = props;
  const createSortHandler =
    (property: keyof IOrderManagement) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="right"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ padding: "5px" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
export default EnhancedTableHead;
