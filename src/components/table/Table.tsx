import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import TrProduct from "./TrProduct";
import {
  IOrder,
  IOrderManagement,
  IPriceManagement,
  IProduct,
  IProductManagement,
  TDeliveryStatus,
  TOrder,
} from "types/interfaces.types";
import { useLocation } from "react-router-dom";
import TrPrice from "./TrPrice";
import TrOrder from "./TrOrder";
import SearchIcon from "@mui/icons-material/Search";
import {
  getOrdersAdminService,
  getProductsAdminService,
} from "services/services.services";
import {
  Button,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import EnhancedTableHead from "./TableHead";
import {
  createOrderDataForManagementTable,
  createPriceDataForManagementTable,
  createProductDataForManagementTable,
  descendingComparator,
  isAnPriceManagement,
  isAnProductManagement,
} from "utils/functions.util";

const RowType: React.FC<{
  rowData: IProductManagement | IPriceManagement | IOrderManagement;
}> = ({ rowData }) => {
  if (isAnProductManagement(rowData)) {
    return <TrProduct rowData={rowData} />;
  } else if (isAnPriceManagement(rowData)) {
    return <TrPrice rowData={rowData} />;
  } else {
    return <TrOrder rowData={rowData} />;
  }
};
const HeaderType: React.FC<{
  path: any;
  setDelivered?: any;
  setSearchText: any;
}> = ({ path, setDelivered, setSearchText }) => {
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
        <Button variant="contained" sx={{ backgroundColor: "#05c46b" }}>
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
      <Box>
        {" "}
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
            onChange={(e) => {
              setDelivered(e.currentTarget.value === "waiting" ? false : true);
            }}
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
      </Box>
    );
  }
};

function getComparator<Key extends keyof any>(
  order: TOrder,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
interface ITableProps {
  headers: any[];
}

const EnhancedTable: React.FC<ITableProps> = ({ headers }) => {
  const [order, setOrder] = React.useState<TOrder>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IOrderManagement>("totalPrice");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowData, setRowData] = React.useState<any[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [delivered, setDelivered] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const location = useLocation();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IOrderManagement
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const getOrderData = (
    deliveryStatus: TDeliveryStatus,
    page: string,
    rows: string
  ) => {
    let result = { data: [], total: "" };
    getOrdersAdminService(
      deliveryStatus,
      page,
      rows,
      "userDescription.name",
      searchText
    )
      .then((res) => {
        const data = createOrderDataForManagementTable(res.data);
        setRowData(data);
        setTotalRows(+res.total);
      })
      .catch((e) => {
        console.log(e);
      });
    return result;
  };
  const getProductsData = (path: any, page: string, rows: string) => {
    getProductsAdminService(page, rows, "userDescription.name", searchText)
      .then((res) => {
        if (path === "inventory") {
          const data = createPriceDataForManagementTable(res.data);
          setRowData(data);
          setTotalRows(+res.total);
        } else {
          const data = createProductDataForManagementTable(res.data);
          setRowData(data);
          setTotalRows(+res.total);
        }
      })
      .catch((e) => console.log(e));
  };
  const handleData = (newPage: number) => {
    const loc = location.pathname.split("/")[3];
    if (loc === "orders") {
      const deliveryStatus: TDeliveryStatus =
        delivered === true ? "delivered" : "notDelivered";
      getOrderData(
        deliveryStatus,
        (newPage + 1).toString(),
        rowsPerPage.toString()
      );
    } else {
      getProductsData(loc, (newPage + 1).toString(), rowsPerPage.toString());
    }
  };
  const handleChangePage = (event: unknown, newPage: number) => {
    handleData(newPage);
    setPage(newPage);
  };
  React.useEffect(() => {
    handleChangePage("", 0);
  }, [location.pathname, delivered, searchText]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(() => +event.target.value);
    setPage(0);
    handleChangePage("", 0);
  };

  return (
    <Box sx={{ width: "90%", mr: "auto", ml: "auto" }}>
      <TextField
        size="small"
        variant="outlined"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
        onChange={(e) => setSearchText(e.currentTarget.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {HeaderType({ path: location.pathname, setDelivered, setSearchText })}
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: "60%" }} size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={8}
              headers={headers}
            />
            <TableBody>
              {rowData.sort(getComparator(order, orderBy)).map((row) => {
                return RowType({ rowData: row });
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 8, 10]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};
export default EnhancedTable;
