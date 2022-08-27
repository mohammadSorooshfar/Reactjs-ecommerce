import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
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
import { ICart, IOrder } from "types/interfaces.types";
import { persianNumber } from "utils/functions.util";
interface props {
  open: any;
  setOpen: any;
  order: IOrder;
}

const OrderModal: React.FC<props> = ({ open, setOpen, order }) => {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
      <DialogTitle sx={{ pt: 2 }}>نمایش سفارش</DialogTitle>
      <DialogContent
        sx={{
          marginRight: "auto",
          marginLeft: "auto",
          textAlign: "center",
          p: 1,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"right"}
          width={"400px"}
          mb={1}
        >
          <Typography fontWeight={"bold"} width={"40%"}>
            نام مشتری:
          </Typography>
          <Typography>
            {order.userDescription.name + " " + order.userDescription.family}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"right"}
          width={"400px"}
          mb={1}
        >
          <Typography fontWeight={"bold"} width={"40%"}>
            آدرس:
          </Typography>
          <Typography>{order.userDescription.address}</Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"right"}
          width={"400px"}
          mb={1}
        >
          <Typography fontWeight={"bold"} width={"40%"}>
            تلفن:
          </Typography>
          <Typography>{order.userDescription.phone}</Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"right"}
          width={"400px"}
          mb={1}
        >
          <Typography fontWeight={"bold"} width={"40%"}>
            زمان تحویل درخواستی:
          </Typography>
          <Typography>{order.requestedDeliveryDate}</Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          textAlign={"right"}
          width={"400px"}
          mb={1}
        >
          <Typography fontWeight={"bold"} width={"40%"}>
            زمان سفارش:
          </Typography>
          <Typography>{order.orderSubmitDate}</Typography>
        </Box>
        <TableContainer component={Paper}>
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
                  <TableCell align="right">{product.name}</TableCell>
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
          <Button variant="contained" color="success" sx={{ marginTop: 2 }}>
            تحویل شد
          </Button>
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
