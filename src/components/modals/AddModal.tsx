import * as React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  BoxProps,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
} from "@mui/material";
import { Field, FieldAttributes, Form, Formik, useField } from "formik";
import { TextFieldProps } from "material-ui";
import Editor from "react-wysiwyg-typescript";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
interface props {
  open: any;
  setOpen: any;
  handleSubmit: any;
}
// const ImagesSelector: React.FC<FieldAttributes<{}>> = ({
//   placeholder,
//   ...props
// }) => {
//   const [field] = useField<{}>(props);
//   return (
//     <Input
//       placeholder={placeholder}
//       type="file"
//       inputProps={{ multiple: true }}
//       {...field}
//     />
//   );
// };
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
  const [files, setFiles] = React.useState<any>();
  const [gender, setGender] = React.useState<any>({});
  const [category, setCategory] = React.useState<any>({});
  const handleClose = () => {
    setOpen(false);
  };
  const BoxFormStyle: any = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    mb: 1,
  }));
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
      <DialogContent sx={{ textAlign: "center", p: 1 }}>
        <Formik
          initialValues={{
            name: "",
            color: "",
            images: files,
            price: "",
            inventory: "",
          }}
          validate={(values) => {
            console.log(values, files, category);
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
                height: "400px",
              }}
            >
              <div>
                <BoxFormStyle>
                  <Field
                    placeholder="نام کالا"
                    name="name"
                    required
                    type="text"
                    as={FormTextFieldStyle}
                  />
                  <Field
                    placeholder="قیمت"
                    name="price"
                    required
                    type="text"
                    as={FormTextFieldStyle}
                  />
                </BoxFormStyle>
                <BoxFormStyle>
                  <Field
                    placeholder="موجودی"
                    name="inventory"
                    required
                    type="text"
                    as={FormTextFieldStyle}
                  />
                  <Field
                    placeholder="رنگ"
                    name="color"
                    required
                    type="text"
                    as={FormTextFieldStyle}
                  />
                </BoxFormStyle>
                <BoxFormStyle>
                  {/* <Field
                    component={TextField}
                    label="جنسیت"
                    select
                    style={{ width: "45%", color: "black" }}
                    inputProps={{ name: "gender", id: "gender" }}
                  >
                    <MenuItem value="men">مردانه</MenuItem>
                    <MenuItem value="women">زنانه</MenuItem>
                    <MenuItem value="kid">بچگانه</MenuItem>
                  </Field> */}

                  <Select
                    displayEmpty
                    value={gender.fa}
                    sx={{ width: "45%" }}
                    onChange={(e) => {
                      setGender({
                        en: e.target.value[0],
                        fa: e.target.value[1],
                      });
                    }}
                    input={<OutlinedInput />}
                    renderValue={(selected: any) => {
                      if (!selected) {
                        return <em>جنسیت</em>;
                      }
                      return selected;
                    }}
                  >
                    <MenuItem disabled value="جنسیت">
                      <em>جنسیت</em>
                    </MenuItem>
                    <MenuItem value={["sport", "مردانه"]}>مردانه</MenuItem>
                    <MenuItem value={["oxford", "زنانه"]}>زنانه</MenuItem>
                    <MenuItem value={["sneaker", "بچگانه"]}>بچگانه</MenuItem>
                  </Select>
                  <Select
                    displayEmpty
                    value={category.fa}
                    sx={{ width: "45%" }}
                    onChange={(e) => {
                      setCategory({
                        en: e.target.value[0],
                        fa: e.target.value[1],
                      });
                    }}
                    input={<OutlinedInput />}
                    renderValue={(selected: any) => {
                      if (!selected) {
                        return <em>دسته بندی</em>;
                      }
                      return selected;
                    }}
                  >
                    <MenuItem disabled value="دسته بندی">
                      <em>دسته بندی</em>
                    </MenuItem>
                    <MenuItem value={["sport", "ورزشی"]}>ورزشی</MenuItem>
                    <MenuItem value={["oxford", "رسمی"]}>رسمی</MenuItem>
                    <MenuItem value={["sneaker", "کتانی"]}>کتانی</MenuItem>
                  </Select>
                  {/* <Field as="select" name="gender">
                    <option value="men">مردانه</option>
                    <option value="women">زنانه</option>
                    <option value="kid">بچگانه</option>
                  </Field> */}
                </BoxFormStyle>

                <Input
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={(e) =>
                    setFiles((e.target as HTMLInputElement).files)
                  }
                  sx={{ mt: 4, width: "90%" }}
                />
              </div>
              <DialogActions>
                <Button
                  variant={"contained"}
                  onClick={handleClose}
                  color="error"
                  sx={{ ml: 1 }}
                >
                  انصراف
                </Button>
                <Button variant={"contained"} color="success" type="submit">
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
