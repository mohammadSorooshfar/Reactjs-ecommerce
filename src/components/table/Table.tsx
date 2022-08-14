import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import * as React from "react";
import { useLocation } from "react-router-dom";
import {
  getOrdersAdminService,
  getProductsAdminService,
} from "services/services.services";
import {
  IOrderManagement,
  TDeliveryStatus,
  TOrder,
} from "types/interfaces.types";
import {
  createOrderDataForManagementTable,
  createPriceDataForManagementTable,
  createProductDataForManagementTable,
  descendingComparator,
} from "utils/functions.util";
import EnhancedTableHead from "./TableHead";

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
  RowType: any;
  ActionButtons: any;
}

const EnhancedTable: React.FC<ITableProps> = ({
  headers,
  RowType,
  ActionButtons,
}) => {
  const [order, setOrder] = React.useState<TOrder>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof IOrderManagement>("totalPrice");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rowData, setRowData] = React.useState<any[]>([]);
  const [totalRows, setTotalRows] = React.useState(0);
  const [delivered, setDelivered] = React.useState(false);
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
    getOrdersAdminService(deliveryStatus, page, rows)
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
    getProductsAdminService(page, rows)
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
  }, [location.pathname, delivered]);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(() => +event.target.value);
    setPage(0);
    handleChangePage("", 0);
  };

  return (
    <Box sx={{ width: "90%", mr: "auto", ml: "auto" }}>
      {ActionButtons({ path: location.pathname, setDelivered })}
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
