import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import AddModal from "components/modals/AddModal";
import EnhancedTable from "components/table/Table";
import TrOrder from "components/table/TrOrder";
import TrPrice from "components/table/TrPrice";
import TrProduct from "components/table/TrProduct";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteEditList } from "redux/products";
import {
  addProductAdminService,
  getProductService,
  updateProductsAdminService,
  uploadImagesAdminService,
} from "services/services.services";
import {
  IEditRow,
  IOrderManagement,
  IPriceManagement,
  IProductManagement,
} from "types/interfaces.types";
import {
  getToken,
  isAnPriceManagement,
  isAnProductManagement,
} from "utils/functions.util";

const RowType: React.FC<{
  rowData: IProductManagement | IPriceManagement | IOrderManagement;
  refreshFunction: any;
}> = ({ rowData, refreshFunction }) => {
  if (isAnProductManagement(rowData)) {
    return (
      <TrProduct
        rowData={rowData}
        refreshFunction={refreshFunction}
        key={rowData.id}
      />
    );
  } else if (isAnPriceManagement(rowData)) {
    return <TrPrice rowData={rowData} key={rowData.id} />;
  } else {
    return (
      <TrOrder
        rowData={rowData}
        refreshFunction={refreshFunction}
        key={rowData.id}
      />
    );
  }
};
const ActionButtons: React.FC<{
  path: any;
  setDelivered?: any;
  rowsData: [];
  refreshFunction: any;
  setLoading: any;
}> = ({ path, setDelivered, rowsData, refreshFunction, setLoading }) => {
  const [addOpen, setAddOpen] = useState(false);
  const editList = useSelector((state: any) => state.products.editList);
  const dispatch = useDispatch();

  const handleEditPrice = () => {
    setLoading(true);
    const getPromises = editList.map((editedRow: IEditRow) => {
      return getProductService(editedRow.id.toString());
    });
    Promise.all(getPromises)
      .then((products) => {
        const putPromises = products.map((product, index) => {
          editList[index].priceEdit &&
            (product.price = editList[index].priceData);
          editList[index].inventoryEdit &&
            (product.inventory = editList[index].inventoryData);
          return updateProductsAdminService(product.id.toString(), product);
        });
        Promise.all(putPromises)
          .then(() => {
            toast.success("???????????? ?????????????? ???? ???????????? ?????????? ????");
            dispatch(deleteEditList());
            refreshFunction();
          })
          .catch((res) => {
            toast.error("???? ???????????? ???????????? ?????????? ???????? ????????");
          });
      })
      .catch((res) => {
        toast.error("???? ???????????? ???????????? ?????????? ???????? ????????");
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
        token: getToken(),
      },
    };
    const imagePromises = Object.values(data.files).map((file: any) => {
      let formData = new FormData();
      formData.append("image", file);
      return uploadImagesAdminService(formData, reqConfig);
    });
    Promise.all(imagePromises).then((arrOfResults) => {
      const now = new Date();
      const allFormData = {
        name: data.name,
        colors: [data.color],
        images: [...arrOfResults],
        price: +data.price,
        inventory: +data.inventory,
        gender: { en: data.gender.en, fa: data.gender.fa },
        category: { en: data.category.en, fa: data.category.fa },
        description: data.description,
        createdAt: now,
      };
      console.log([data.color], allFormData.colors);

      addProductAdminService(allFormData)
        .then((res) => {
          console.log(res);
          toast.success("???????? ???? ???????????? ?????????? ????");
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
          <Typography variant="h5">???????????? ????????????</Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#05c46b" }}
            onClick={() => setAddOpen(true)}
          >
            ???????????? ????????
          </Button>
        </Box>
        <AddModal
          open={addOpen}
          setOpen={setAddOpen}
          handleSubmit={handleAdd}
          edit={false}
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
        <Typography variant="h5">???????????? ???????????? ?? ???????? ????</Typography>

        <Button
          variant="contained"
          color={"success"}
          onClick={() => handleEditPrice()}
          disabled={editList.length === 0}
        >
          ??????????
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
        <Typography variant="h5">???????????? ?????????? ????</Typography>
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
            label=" ?????????? ?????? ???? ???????????? ??????????"
            sx={{ margin: 0 }}
          />
          <FormControlLabel
            value="delivered"
            control={<Radio />}
            label="?????????? ?????? ?????????? ??????"
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
          label: "??????????",
        },
        {
          id: "name",
          numeric: false,
          disablePadding: true,
          label: "?????? ????????",
        },
        {
          id: "category",
          numeric: false,
          disablePadding: true,
          label: "???????? ????????",
        },
        {
          id: "action",
          numeric: false,
          disablePadding: true,
          label: "????????????/??????",
        },
      ]);
    } else if (dashboardLoc === "inventory") {
      setHeaders([
        {
          id: "name",
          numeric: false,
          disablePadding: true,
          label: "?????? ????????",
        },
        {
          id: "price",
          numeric: true,
          disablePadding: true,
          label: "????????",
        },
        {
          id: "inventory",
          numeric: true,
          disablePadding: true,
          label: "????????????",
        },
      ]);
    } else {
      setHeaders([
        {
          id: "name",
          numeric: false,
          disablePadding: true,
          label: "?????? ??????????",
        },
        {
          id: "totalPrice",
          numeric: true,
          disablePadding: true,
          label: "?????????? ????????",
        },
        {
          id: "orderSubmitDate",
          numeric: false,
          disablePadding: true,
          label: "???????? ?????? ??????????",
        },
        {
          id: "manage order",
          numeric: false,
          disablePadding: true,
          label: "?????????? ??????????",
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
