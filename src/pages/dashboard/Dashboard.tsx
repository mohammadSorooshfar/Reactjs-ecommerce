import { getProducts } from "api/admin/products.api";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductsService } from "services/services";

interface props {}

const Dashboard: React.FC<props> = () => {
  const location = useLocation();
  const [data, setData] = useState<{}>();
  const getData = (path: string) => {
    const dashboardLoc = path.split("/")[3];
    if (dashboardLoc === "products" || dashboardLoc === "inventory") {
      getProductsService()
        .then((res) => setData(res))
        .catch((e) => console.log(e));
    }
  };
  useEffect(() => {
    getData(location.pathname);
  }, [location.pathname]);
  return <div>Dashboard</div>;
};

export default Dashboard;
