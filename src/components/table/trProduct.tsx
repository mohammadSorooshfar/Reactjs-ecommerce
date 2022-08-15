import {
  Avatar,
  Button,
  ButtonGroup,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import AddModal from "components/modals/AddModal";
import DeleteModal from "components/modals/DeleteModal";
import { BASE_URL, IMAGES } from "configs/url.config";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  deleteProductsAdminService,
  updateProductsAdminService,
  uploadImagesAdminService,
} from "services/services.services";
import { IProduct, IProductManagement } from "types/interfaces.types";

const TrProduct: React.FC<{
  rowData: IProductManagement;
  refreshFunction: any;
}> = ({ rowData, refreshFunction }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const products = useSelector((state: any) => state.products.products);
  const product = useRef<IProduct>(
    products.find((product: IProduct) => product.id == rowData.id)
  );

  const DeleteButton = styled(Button)<{}>(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  }));
  const EditButton = styled(Button)<{}>(({ theme }) => ({
    backgroundColor: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: theme.palette.warning.dark,
    },
  }));
  const handleSubmit = () => {
    deleteProductsAdminService(rowData.id.toString())
      .then((res) => {
        setOpenDelete(false);
        toast.success("کالا با موفقیت حذف شد");
        refreshFunction();
        console.log(res);
      })
      .catch((e) => {
        setOpenDelete(false);
        toast.error("حذف کالا با خطا روبرو شد");
      });
  };
  const handleEdit = (data: {
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
    const imagePromises = Object.values(data.files).map((file: any) => {
      let formData = new FormData();
      formData.append("image", file);
      return uploadImagesAdminService(formData, reqConfig);
    });
    Promise.all(imagePromises).then((arrOfResults) => {
      const allFormData = {
        id: product.current.id,
        name: data.name,
        colors: [
          data.color ? data.color : product.current.colors[0],
          ...product.current.colors.slice(1),
        ],
        images: [...product.current.images, ...arrOfResults],
        price: +data.price,
        inventory: +data.inventory,
        gender: { [data.gender.en]: data.gender.fa },
        category: { [data.category.en]: data.category.fa },
        description: data.description,
      };

      updateProductsAdminService(rowData.id.toString(), allFormData)
        .then((res) => {
          console.log(res);
          toast.success("کالا با موفقیت ویرایش شد");
          refreshFunction();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
        <TableCell align="right">
          <Avatar
            variant="rounded"
            src={`${BASE_URL}${IMAGES}/${rowData.images[0]}`}
            sx={{ width: 56, height: 56 }}
          />
        </TableCell>
        <TableCell align="right">{rowData.name}</TableCell>
        <TableCell align="right">{`${Object.values(rowData.gender)[0]}/${
          Object.values(rowData.category)[0]
        }`}</TableCell>
        <TableCell align="right">
          <ButtonGroup
            disableElevation
            variant="contained"
            sx={{ flexDirection: "row-reverse" }}
          >
            <DeleteButton onClick={() => setOpenDelete(true)}>حذف</DeleteButton>
            <EditButton
              onClick={() => {
                setOpenUpdate(true);
              }}
            >
              ویرایش
            </EditButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        product={rowData.name}
        handleSubmit={handleSubmit}
      />
      <AddModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        handleSubmit={handleEdit}
        data={product.current}
      />
    </>
  );
};

export default TrProduct;
