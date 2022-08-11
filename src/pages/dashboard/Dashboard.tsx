import EnhancedTable from "components/table/Table";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsAdminService } from "services/services";
import { IOrder, IProduct } from "types/interfaces.types";

interface props {}

const Dashboard: React.FC<props> = () => {
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
  useLayoutEffect(() => {
    setHeaderByPath(location.pathname);
  }, [location.pathname]);
  return (
    <div>
      <EnhancedTable headers={headers} />
    </div>
  );
};

export default Dashboard;
