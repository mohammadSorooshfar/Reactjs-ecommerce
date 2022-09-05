import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";
import { Link } from "react-router-dom";
import { ICart, IOrder } from "types/interfaces.types";
import { persianNumber } from "utils/functions.util";

const TextBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      textAlign={"right"}
      width={"400px"}
      mb={2}
    >
      {children}
    </Box>
  );
};
interface props {
  open: any;
  setOpen: any;
  order: IOrder;
  handleDeliveryClick: (id: number, data: IOrder) => void;
}

const OrderModal: React.FC<props> = ({
  open,
  setOpen,
  order,
  handleDeliveryClick,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const now = new DateObject({
    date: new Date(),
    calendar: persian,
    locale: persian_fa,
  });
  return (
    <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
      <DialogTitle sx={{ pt: 5 }}>نمایش سفارش</DialogTitle>
      <DialogContent
        sx={{
          marginRight: "auto",
          marginLeft: "auto",
          textAlign: "center",
          p: 1,
          pb: 5,
        }}
      >
        <TextBox>
          <Typography fontWeight={"bold"} width={"40%"}>
            نام مشتری:
          </Typography>
          <Typography>
            {order.userDescription.name + " " + order.userDescription.family}
          </Typography>
        </TextBox>
        <TextBox>
          <Typography fontWeight={"bold"} width={"40%"}>
            آدرس:
          </Typography>
          <Typography>{order.userDescription.address}</Typography>
        </TextBox>
        <TextBox>
          <Typography fontWeight={"bold"} width={"40%"}>
            تلفن:
          </Typography>
          <Typography>{order.userDescription.phone}</Typography>
        </TextBox>
        <TextBox>
          <Typography fontWeight={"bold"} width={"40%"}>
            زمان تحویل درخواستی:
          </Typography>
          <Typography>{order.requestedDeliveryDate}</Typography>
        </TextBox>
        <TextBox>
          <Typography fontWeight={"bold"} width={"40%"}>
            زمان سفارش:
          </Typography>
          <Typography>{order.orderSubmitDate}</Typography>
        </TextBox>
        <TableContainer component={Paper} sx={{ marginY: 3 }}>
          <Table sx={{ minWidth: "400px" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="right">کالا</TableCell>
                <TableCell align="right">قیمت</TableCell>
                <TableCell align="right">تعداد</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.products.map((product: ICart) => (
                <TableRow
                  key={product.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right">
                    <Link
                      to={`/tehranshoes/product/${product.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    {persianNumber(product.price.toString())}
                  </TableCell>
                  <TableCell align="right">
                    {persianNumber(product.quantity.toString())}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {order.deliveryStatus === "notDelivered" ? (
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 2 }}
            onClick={() => {
              handleClose();
              handleDeliveryClick(order.id || 1, {
                ...order,
                deliveryDate: now.format(),
                deliveryStatus: "delivered",
              });
            }}
          >
            تحویل شد
          </Button>
        ) : (
          <TextBox>
            <Typography fontWeight={"bold"} width={"40%"}>
              زمان تحویل:
            </Typography>
            <Typography>{order.deliveryDate}</Typography>
          </TextBox>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
