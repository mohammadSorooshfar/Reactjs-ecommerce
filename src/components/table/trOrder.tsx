import { Button, TableCell, TableRow } from "@mui/material";
import OrderModal from "components/modals/OrderModal";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateOrdersAdminService } from "services/services.services";
import { IOrder, IOrderManagement } from "types/interfaces.types";

const TrOrder: React.FC<{
  rowData: IOrderManagement;
  refreshFunction: any;
}> = ({ rowData, refreshFunction }) => {
  const [openModal, setOpenModal] = useState(false);
  const orders = useSelector((state: any) => state.orders.orders);
  const handleDeliveryClick = (id: number, data: IOrder) => {
    updateOrdersAdminService(id.toString(), data)
      .then(() => {
        refreshFunction();
        toast.success("کالا با موفقیت تحویل داده شد");
      })
      .catch(() => {
        toast.error("تحویل کالا با مشکل مواجه شد");
      });
  };
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={rowData.id}>
        <TableCell align="right">{rowData.name}</TableCell>
        <TableCell align="right">{rowData.totalPrice}</TableCell>
        <TableCell align="right">{rowData.orderSubmitDate}</TableCell>
        <TableCell align="right">
          <Button onClick={() => setOpenModal(true)}>بررسی سفارش</Button>
        </TableCell>
      </TableRow>
      <OrderModal
        open={openModal}
        setOpen={setOpenModal}
        order={orders.find((order: IOrder) => order.id === rowData.id)}
        key={rowData.id}
        handleDeliveryClick={handleDeliveryClick}
      />
    </>
  );
};

export default TrOrder;
