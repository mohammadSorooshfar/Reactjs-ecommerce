import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, MenuItem, Select, styled } from "@mui/material";
import { Field, FieldAttributes, Form, Formik, useField } from "formik";
import { TextFieldProps } from "material-ui";
import Editor from "react-wysiwyg-typescript";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
interface props {
  open: any;
  setOpen: any;
  handleSubmit: any;
}
const ImagesSelector: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field] = useField<{}>(props);
  return (
    <Input
      placeholder={placeholder}
      type="file"
      inputProps={{ multiple: true }}
      {...field}
    />
  );
};
// const CategorySelector: React.FC<FieldAttributes<{}>> = ({
//   placeholder,
//   defaultValue,
//   children,
//   ...props
// }) => {
//   const [field] = useField<{}>(props);
//   console.log(placeholder, defaultValue);

//   return (
//     <Select defaultValue={defaultValue} sx={{ width: "45%" }} {...field}>
//       {children}
//     </Select>
//   );
// };
const AddModal: React.FC<props> = ({ open, setOpen, handleSubmit }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const FormTextFieldStyle: any = styled(TextField)<TextFieldProps>(
    ({ theme }) => ({
      width: "400px",
      padding: "16.5px 14px",
      [theme.breakpoints.down("sm")]: {
        width: "300px",
      },
    })
  );

  return (
    <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
      <DialogTitle>افزودن کالا</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            color: "",
            images: [],
            price: "",
            inventory: "",
            gender: "men",
            category: "sport",
          }}
          validate={(values) => {
            console.log(values);
          }}
          onSubmit={(data, { setSubmitting }) => {
            handleSubmit(data);
          }}
        >
          {({ isSubmitting }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "240px",
              }}
            >
              <div>
                <Field
                  placeholder="نام کالا"
                  name="name"
                  required
                  type="text"
                  as={FormTextFieldStyle}
                />
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Field
                    placeholder="قیمت"
                    name="price"
                    required
                    type="text"
                    as={FormTextFieldStyle}
                  />
                  <Field
                    placeholder="موجودی"
                    name="inventory"
                    required
                    type="text"
                    as={FormTextFieldStyle}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginBottom: "10px",
                  }}
                >
                  <Field
                    component={TextField}
                    label="جنسیت"
                    select
                    style={{ width: "45%", color: "black" }}
                    inputProps={{ name: "gender", id: "gender" }}
                  >
                    <MenuItem value="men">مردانه</MenuItem>
                    <MenuItem value="women">زنانه</MenuItem>
                    <MenuItem value="kid">بچگانه</MenuItem>
                  </Field>
                  {/* <Field
                    component={Select}
                    label="دسته"
                    name="category"
                    style={{ width: "45%", color: "black" }}
                    inputProps={{ name: "gender", id: "gender" }}
                  >
                    <MenuItem value="sport">ورزشی</MenuItem>
                    <MenuItem value="oxford">رسمی</MenuItem>
                    <MenuItem value="sneaker">کتانی</MenuItem>
                  </Field> */}
                  <TextField
                    select
                    placeholder="جنسیت"
                    name="category"
                    style={{
                      width: "45%",
                      color: "black",
                    }}
                    onChange={(e) => console.log(e.target.value)}
                  >
                    <MenuItem value="sport" selected>
                      ورزشی
                    </MenuItem>
                    <MenuItem value="oxford">رسمی</MenuItem>
                    <MenuItem value="sneaker">کتانی</MenuItem>
                  </TextField>
                  {/* <Field as="select" name="gender">
                    <option value="men">مردانه</option>
                    <option value="women">زنانه</option>
                    <option value="kid">بچگانه</option>
                  </Field> */}
                </div>
                <ImagesSelector placeholder="عکس کالا" name="images" />
                <TextField></TextField>
                <Field
                  placeholder="رنگ"
                  name="color"
                  required
                  type="text"
                  as={FormTextFieldStyle}
                />
              </div>
              <DialogActions>
                <Button onClick={handleClose} color="error">
                  انصراف
                </Button>
                <Button color="success" type="submit">
                  افزودن
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default AddModal;
