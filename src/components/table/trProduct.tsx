import {
  Avatar,
  Button,
  ButtonGroup,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import DeleteModal from "components/modals/DeleteModal";
import { BASE_URL, IMAGES, UPLOAD_IMAGE } from "configs/url.config";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { deleteProductsAdminService } from "services/services.services";
import { IProductManagement } from "types/interfaces.types";

const TrProduct: React.FC<{
  rowData: IProductManagement;
  refreshFunction: any;
}> = ({ rowData, refreshFunction }) => {
  const [openDelete, setOpenDelete] = useState(false);
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
  return (
    <>
      <TableRow hover role="checkbox" tabIndex={-1} key={rowData.name}>
        <TableCell align="right">
          <Avatar
            variant="rounded"
            src={`${BASE_URL}${IMAGES}/${rowData.types[0].images[0]}`}
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
            <EditButton>ویرایش</EditButton>
          </ButtonGroup>
        </TableCell>
      </TableRow>
      <DeleteModal
        open={openDelete}
        setOpen={setOpenDelete}
        product={rowData.name}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default TrProduct;
