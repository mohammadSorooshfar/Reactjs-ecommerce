import EnhancedTable from "components/table/Table";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  IOrderManagement,
  IPriceManagement,
  IProduct,
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
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editableToggle } from "redux/products";
import {
  addProductAdminService,
  updateProductsAdminService,
  uploadImagesAdminService,
} from "services/services.services";
import { toast } from "react-toastify";

const RowType: React.FC<{
  rowData: IProductManagement | IPriceManagement | IOrderManagement;
  refreshFunction: any;
  handleChangePriceInventory: any;
}> = ({ rowData, refreshFunction, handleChangePriceInventory }) => {
  if (isAnProductManagement(rowData)) {
    return <TrProduct rowData={rowData} refreshFunction={refreshFunction} />;
  } else if (isAnPriceManagement(rowData)) {
    return (
      <TrPrice
        rowData={rowData}
        handleChangePriceInventory={handleChangePriceInventory}
      />
    );
  } else {
    return <TrOrder rowData={rowData} />;
  }
};
const ActionButtons: React.FC<{
  path: any;
  setDelivered?: any;
  rowsData: [];
  refreshFunction: any;
}> = ({ path, setDelivered, rowsData, refreshFunction }) => {
  const [addOpen, setAddOpen] = useState(false);
  const editable = useSelector((state: any) => state.products.editable);
  const products = useSelector((state: any) => state.products.products);
  const dispatch = useDispatch();
  const handleEditPrice = (
    rowsData: IPriceManagement[],
    dispatch: any,
    products: IProduct[]
  ) => {
    console.log(rowsData);
    dispatch(editableToggle());
    const editedProducts: IProduct[] = [];
    products.forEach((product: IProduct, index) => {
      if (
        product.price !== rowsData[index].price ||
        product.inventory !== rowsData[index].inventory
      ) {
        const newProduct = { ...product };
        newProduct.price = rowsData[index].price;
        newProduct.inventory = rowsData[index].inventory;
        return editedProducts.push(newProduct);
      }
    }, []);
    const promises = editedProducts.map((product) =>
      updateProductsAdminService(product.id.toString(), product)
    );
    Promise.all(promises)
      .then((res) => {
        toast.success("ویرایش محصولات با موفقیت انجام شد");
        refreshFunction();
      })
      .catch((res) => {
        toast.error("در ویرایش کالاها خطایی صورت گرفت");
      });
  };
  const handleAdd = (data: {
    name: string;
    price: string;
    color: string;
    inventory: string;
    gender: { fa: string; en: string };
    category: { fa: string; en: string };
    files: FileList;
    description: string;
  }) => {
    const reqConfig = {
      headers: {
        "content-type": "multipart/form-data",
        token: localStorage.getItem("ACCESS_TOKEN"),
      },
    };
    console.log(data);

    const imagePromises = Object.values(data.files).map((file: any) => {
      let formData = new FormData();
      formData.append("image", file);
      return uploadImagesAdminService(formData, reqConfig);
    });
    Promise.all(imagePromises).then((arrOfResults) => {
      const allFormData = {
        name: data.name,
        types: [
          {
            color: data.color,
            images: [...arrOfResults],
          },
        ],
        price: data.price,
        inventory: data.inventory,
        gender: { [data.gender.en]: data.gender.fa },
        category: { [data.category.en]: data.category.fa },
        description: data.description,
      };

      addProductAdminService(allFormData)
        .then((res) => {
          console.log(res);
          toast.success("کالا با موفقیت اضافه شد");
          refreshFunction();
        })
        .catch((e) => {
          console.log(e);
        });
    });
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

        <Button
          variant="contained"
          color={"success"}
          onClick={() => handleEditPrice(rowsData, dispatch, products)}
          disabled={!editable}
        >
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
