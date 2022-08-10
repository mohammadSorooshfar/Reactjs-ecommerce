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
import { IProduct } from "types/interfaces.types";
import { useLocation } from "react-router-dom";
import TrPrice from "./TrPrice";
import TrOrder from "./TrOrder";
import { getProductsAdminService } from "services/services";
import { descendingComparator } from "utils/functions.util";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

const RowType: React.FC<{ path: any; rowData: IProduct }> = ({
  path,
  rowData,
}) => {
  const dashboardLoc = path.split("/")[3];
  if (dashboardLoc === "products") {
    return <TrProduct rowData={rowData} />;
  } else if (dashboardLoc === "inventory") {
    return <TrPrice rowData={rowData} />;
  } else {
    return <TrOrder rowData={rowData} />;
  }
};
const HeaderType: React.FC<{ path: any }> = ({ path }) => {
  const dashboardLoc = path.split("/")[3];
  if (dashboardLoc === "products") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "20px",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">مدیریت کالاها</Typography>
        <Button variant="contained" sx={{ backgroundColor: "#0F3D3E" }}>
          افزودن کالا
        </Button>
      </Box>
    );
  } else if (dashboardLoc === "inventory") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "20px",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">مدیریت موجودی و قیمت ها</Typography>
        <Button variant="contained" disabled>
          ذخیره
        </Button>
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: "20px",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">مدیریت سفارش ها</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="waiting"
          name="radio-buttons-group"
          sx={{ flexDirection: "row" }}
        >
          <FormControlLabel
            value="waiting"
            control={<Radio />}
            label=" سفارش های در انتظار ارسال"
            sx={{ margin: 0 }}
          />
          <FormControlLabel
            value="delivered"
            control={<Radio />}
            label="سفارش های تحویل شده"
            sx={{ margin: 0 }}
          />
        </RadioGroup>
      </Box>
    );
  }
};

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface EnhancedTableProps {
  order?: Order;
  orderBy?: string;
  rowCount: number;
  headers: any[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, rowCount, headers } = props;
  // const createSortHandler =
  //   (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
  //     onRequestSort(event, property);
  //   };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#2666CF" }}>
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
              // onClick={createSortHandler(headCell.id)}
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

interface ITableProps {
  headers: any[];
}

const EnhancedTable: React.FC<ITableProps> = ({ headers }) => {
  const [order, setOrder] = React.useState<Order>("asc");
  // const [orderBy, setOrderBy] = React.useState<keyof Data>("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowData, setRowData] = React.useState([]);

  const location = useLocation();

  // const handleRequestSort = (property: keyof Data) => {
  //   const isAsc = orderBy === property && order === "asc";
  //   setOrder(isAsc ? "desc" : "asc");
  //   setOrderBy(property);
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    getProductsAdminService((newPage + 1).toString(), rowsPerPage.toString())
      .then((res) => {
        setRowData(res);
      })
      .catch((e) => console.log(e));
    setPage(newPage);
  };
  React.useEffect(() => {
    handleChangePage("", 0);
  }, []);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
    handleChangePage("", 0);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {HeaderType({ path: location.pathname })}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size="medium">
            <EnhancedTableHead
              order={order}
              // orderBy={orderBy}
              // onRequestSort={handleRequestSort}
              rowCount={8}
              headers={headers}
            />
            <TableBody>
              {rowData
                // .sort(getComparator(order, orderBy))
                .map((row) => {
                  return RowType({ path: location.pathname, rowData: row });
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 8, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ backgroundColor: "#2666CF" }}
        />
      </Paper>
    </Box>
  );
};
export default EnhancedTable;
