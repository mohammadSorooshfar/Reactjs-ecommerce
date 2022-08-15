import {
  Box,
  BoxProps,
  Input,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  TextareaAutosize,
  Typography,
  TypographyProps,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { convertToRaw } from "draft-js";
import { Field, Form, Formik } from "formik";
import { TextFieldProps } from "material-ui";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { categoryEnglish, genderEnglish } from "utils/functions.util";

import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MultilineText: React.FC = () => {
  return (
    <TextField
      multiline
      rows={4}
      placeholder="Default Value"
      variant="standard"
    />
  );
};

interface props {
  open: any;
  setOpen: any;
  handleSubmit: any;
}
const AddModal: React.FC<props> = ({ open, setOpen, handleSubmit }) => {
  const [files, setFiles] = React.useState<any>([]);
  const [gender, setGender] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [customErrors, setCustomErrors] = React.useState<any>({});

  const handleClose = () => {
    setFiles([]);
    setGender("");
    setCategory("");
    setCustomErrors({});
    setOpen(false);
  };
  const BoxFormStyle: any = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    marginBottom: "20px",
  }));
  const FormTextFieldStyle: any = styled(TextField)<TextFieldProps>(
    ({ theme }) => ({
      width: "255px",
    })
  );
  const ErrorTypographyStyle: any = styled(Typography)<TypographyProps>(
    ({ theme }) => ({
      color: theme.palette.error.main,
      paddingTop: "5px",
      fontSize: "12px",
    })
  );
  const classes = {
    editiorWrapper: {
      width: "500px",
    },
  };

  return (
    <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
      <DialogTitle sx={{ pt: 2 }}>افزودن کالا</DialogTitle>
      <DialogContent sx={{ textAlign: "center", p: 1 }}>
        <Formik
          initialValues={{
            name: "",
            color: "",
            price: "",
            inventory: "",
            description: "",
          }}
          validate={(values) => {
            const errors: any = {};

            if (!values.name) {
              errors.name = "نام کالا را وارد نمایید";
            }
            if (!values.price) {
              errors.price = "قیمت کالا را وارد نمایید";
            } else if (!/^[0-9]*$/.test(values.price)) {
              errors.price = "قیمت کالا باید عدد باشد";
            } else if (+values.price <= 0) {
              errors.price = "قیمت کالا باید بزرگتر از 0 باشد";
            }
            if (!values.color) {
              errors.color = "رنگ کالا را وارد نمایید";
            } else if (!/^[\u0600-\u06FF\s]+$/.test(values.color)) {
              errors.color = "رنگ کالا فقط شامل حروف فارسی می باشد";
            }
            if (!values.inventory) {
              errors.inventory = "موجودی کالا را وارد نمایید";
            } else if (!/^[0-9]*$/.test(values.inventory)) {
              errors.inventory = "موجودی کالا باید عدد باشد";
            } else if (+values.inventory <= 0) {
              errors.inventory = "موجودی کالا باید بزرگتر از 0 باشد";
            }

            return errors;
          }}
          onSubmit={(data, { setSubmitting }) => {
            if (gender && category && files.length) {
              setCustomErrors({});
              const genderTranslate = genderEnglish(gender);
              const categoryTranslate = categoryEnglish(category);
              handleSubmit({
                name: data.name,
                price: data.price,
                color: data.color,
                inventory: data.inventory,
                gender: genderTranslate,
                category: categoryTranslate,
                files,
                description: data.description,
              });
              return;
            }
            if (!gender) {
              setCustomErrors((prev: any) => ({
                gender: "جنسیت را انتخاب کنید",
                ...prev,
              }));
            }
            if (!category) {
              setCustomErrors((prev: any) => ({
                category: "جنسیت را انتخاب کنید",
                ...prev,
              }));
            }
            if (!files.length) {
              setCustomErrors((prev: any) => ({
                files: "عکس را انتخاب کنید",
                ...prev,
              }));
            }
          }}
        >
          {({ isSubmitting, errors, touched }) => (
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
                  <Box>
                    <Field
                      placeholder="نام کالا"
                      name="name"
                      required
                      type="text"
                      as={FormTextFieldStyle}
                    />
                    {errors.name && touched.name && (
                      <ErrorTypographyStyle>{errors.name}</ErrorTypographyStyle>
                    )}
                  </Box>
                  <Box>
                    <Field
                      placeholder="قیمت"
                      name="price"
                      required
                      type="text"
                      as={FormTextFieldStyle}
                    />
                    {errors.price && touched.price && (
                      <ErrorTypographyStyle>
                        {errors.price}
                      </ErrorTypographyStyle>
                    )}
                  </Box>
                </BoxFormStyle>
                <BoxFormStyle>
                  <Box>
                    <Field
                      placeholder="موجودی"
                      name="inventory"
                      required
                      type="text"
                      as={FormTextFieldStyle}
                    />
                    {errors.inventory && touched.inventory && (
                      <ErrorTypographyStyle>
                        {errors.inventory}
                      </ErrorTypographyStyle>
                    )}
                  </Box>
                  <Box>
                    <Field
                      placeholder="رنگ"
                      name="color"
                      required
                      type="text"
                      as={FormTextFieldStyle}
                    />
                    {errors.color && touched.color && (
                      <ErrorTypographyStyle>
                        {errors.color}
                      </ErrorTypographyStyle>
                    )}
                  </Box>
                </BoxFormStyle>
                <BoxFormStyle>
                  <Box>
                    <Select
                      displayEmpty
                      value={gender}
                      sx={{ width: "255px" }}
                      onChange={(e) => {
                        setGender(e.target.value);
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
                      <MenuItem value="مردانه">مردانه</MenuItem>
                      <MenuItem value="زنانه">زنانه</MenuItem>
                      <MenuItem value="بچگانه">بچگانه</MenuItem>
                    </Select>
                    {customErrors.gender && (
                      <ErrorTypographyStyle>
                        {customErrors.gender}
                      </ErrorTypographyStyle>
                    )}
                  </Box>
                  <Box>
                    <Select
                      displayEmpty
                      value={category}
                      sx={{ width: "255px" }}
                      onChange={(e) => {
                        setCategory(e.target.value);
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
                      <MenuItem value="ورزشی">ورزشی</MenuItem>
                      <MenuItem value="رسمی">رسمی</MenuItem>
                      <MenuItem value="کتانی">کتانی</MenuItem>
                    </Select>
                    {customErrors.category && (
                      <ErrorTypographyStyle>
                        {customErrors.category}
                      </ErrorTypographyStyle>
                    )}
                  </Box>
                </BoxFormStyle>
                <Input
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={(e) =>
                    setFiles((e.target as HTMLInputElement).files)
                  }
                  sx={{ mt: 4, mb: 4, width: "90%" }}
                />
                {customErrors.files && (
                  <ErrorTypographyStyle>
                    {customErrors.files}
                  </ErrorTypographyStyle>
                )}
                <Field
                  name="description"
                  placeholder="توضیحات"
                  required
                  type="text"
                  as={FormTextFieldStyle}
                />
              </div>
              <DialogActions sx={{ pb: 1, justifyContent: "center" }}>
                <Button
                  variant={"contained"}
                  onClick={handleClose}
                  color="error"
                  sx={{ ml: 3 }}
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
