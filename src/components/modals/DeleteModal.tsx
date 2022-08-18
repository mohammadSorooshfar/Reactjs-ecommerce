import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface props {
  open: any;
  setOpen: any;
  handleSubmit: any;
  product: string;
}

const DeleteModal: React.FC<props> = ({
  open,
  setOpen,
  handleSubmit,
  product,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} dir="rtl">
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            textAlign: "center",
            pt: 4,
          }}
        >
          <IconButton
            disableRipple
            sx={{
              backgroundColor: "error.dark",
              color: "secondary.main",
              "&:hover": {
                backgroundColor: "error.dark",
              },
              "& .MuiSvgIcon-root": {
                fontSize: "8rem",
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            textAlign: "center",
          }}
        >
          <DialogContentText id="alert-dialog-description">
            آیا از حذف محصول {product} مطمئن هستید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            pb: 3,
          }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleSubmit();
            }}
          >
            حذف
          </Button>
          <Button onClick={handleClose}>انصراف</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteModal;
