import EnhancedTable from "components/table/Table";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IOrderManagement,
  IPriceManagement,
  IProductManagement,
} from "types/interfaces.types";
import {
  isAnPriceManagement,
  isAnProductManagement,
} from "utils/functions.util";
import TrOrder from "components/table/TrOrder";
import TrPrice from "components/table/TrPrice";
import TrProduct from "components/table/TrProduct";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddModal from "components/modals/AddModal";

const RowType: React.FC<{
  rowData: IProductManagement | IPriceManagement | IOrderManagement;
  refreshFunction: any;
}> = ({ rowData, refreshFunction }) => {
  if (isAnProductManagement(rowData)) {
    return <TrProduct rowData={rowData} refreshFunction={refreshFunction} />;
  } else if (isAnPriceManagement(rowData)) {
    return <TrPrice rowData={rowData} />;
  } else {
    return <TrOrder rowData={rowData} />;
  }
};

const ActionButtons: React.FC<{ path: any; setDelivered?: any }> = ({
  path,
  setDelivered,
}) => {
  const [addOpen, setAddOpen] = useState(false);
  const handleAdd = (data: any) => {
    console.log(data);
  };
  const dashboardLoc = path.split("/")[3];
  if (dashboardLoc === "products") {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: "20px",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">مدیریت کالاها</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#05c46b" }}
            onClick={() => setAddOpen(true)}
          >
            افزودن کالا
          </Button>
        </Box>
        <AddModal
          open={addOpen}
          setOpen={setAddOpen}
          handleSubmit={handleAdd}
        />
      </>
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
    );
  }
};

const Dashboard: React.FC = () => {
  const location = useLocation();
  const [headers, setHeaders] = useState<any[]>([]);
  const setHeaderByPath = (path: string) => {
    const dashboardLoc = path.split("/")[3];
    if (dashboardLoc === "products") {
      setHeaders([
        {
          id: "image",
          numeric: false,
          disablePadding: true,
          label: "تصویر",
        },
        {
          id: "name",
          numeric: false,
          disablePadding: true,
          label: "نام کالا",
        },
        {
          id: "category",
          numeric: false,
          disablePadding: true,
          label: "دسته بندی",
        },
        {
          id: "action",
          numeric: false,
          disablePadding: true,
          label: "ویرایش/حذف",
        },
      ]);
    } else if (dashboardLoc === "inventory") {
      setHeaders([
        {
          id: "name",
          numeric: false,
          disablePadding: true,
          label: "نام کالا",
        },
        {
          id: "price",
          numeric: true,
          disablePadding: true,
          label: "قیمت",
        },
        {
          id: "inventory",
          numeric: true,
          disablePadding: true,
          label: "موجودی",
        },
      ]);
    } else {
      setHeaders([
        {
          id: "name",
          numeric: false,
          disablePadding: true,
          label: "نام کاربر",
        },
        {
          id: "totalPrice",
          numeric: true,
          disablePadding: true,
          label: "مجموع مبلغ",
        },
        {
          id: "orderSubmitDate",
          numeric: false,
          disablePadding: true,
          label: "زمان ثبت سفارش",
        },
        {
          id: "manage order",
          numeric: false,
          disablePadding: true,
          label: "بررسی سفارش",
        },
      ]);
    }
  };
  useEffect(() => {
    setHeaderByPath(location.pathname);
  }, [location.pathname]);
  return (
    <div>
      <EnhancedTable
        headers={headers}
        RowType={RowType}
        ActionButtons={ActionButtons}
      />
    </div>
  );
};

export default Dashboard;
