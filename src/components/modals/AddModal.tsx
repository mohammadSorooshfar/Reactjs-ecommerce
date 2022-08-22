import {
  Box,
  BoxProps,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Field, Form, Formik } from "formik";
import { TextFieldProps } from "material-ui";
import * as React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { categoryEnglish, genderEnglish } from "utils/functions.util";
import CancelIcon from "@mui/icons-material/Cancel";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { IProduct } from "types/interfaces.types";
import {
  CKEditor,
  CKEditorEventHandler,
  prefixEventName,
  useCKEditor,
} from "ckeditor4-react";
import { BASE_URL, IMAGES } from "configs/url.config";

interface props {
  open: any;
  setOpen: any;
  handleSubmit: any;
  initProduct?: IProduct;
  edit: boolean;
}
const AddModal: React.FC<props> = ({
  open,
  setOpen,
  handleSubmit,
  initProduct,
  edit,
}) => {
  const [deletedImageIndex, setDeletedImageIndex] = React.useState<number[]>(
    []
  );

  const handleClose = () => {
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

  return (
    <Dialog open={open} onClose={handleClose} dir="rtl" fullWidth>
      <DialogTitle sx={{ pt: 2 }}>
        {initProduct ? "ویرایش" : "افزودن"} کالا
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", p: 1 }}>
        <Formik
          initialValues={{
            name: initProduct ? initProduct.name : "",
            color: initProduct ? initProduct.colors[0] : "",
            price: initProduct ? initProduct.price.toString() : "",
            inventory: initProduct ? initProduct.inventory.toString() : "",
            category: initProduct ? initProduct.category.fa : "",
            gender: initProduct ? initProduct.gender.fa : "",
            description: initProduct ? initProduct.description : "",
            files: [],
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
            if (!values.category) {
              errors.category = "دسته بندی را انتخاب کنید";
            }
            if (!values.gender) {
              errors.gender = "جنسیت را انتخاب کنید";
            }
            if (!values.files.length && !edit) {
              errors.files = "عکس را انتخاب کنید";
            }

            return errors;
          }}
          onSubmit={(data, { setSubmitting }) => {
            const genderTranslate = genderEnglish(data.gender);
            const categoryTranslate = categoryEnglish(data.category);
            if (edit) {
              handleSubmit(
                {
                  name: data.name,
                  price: data.price,
                  color: data.color,
                  inventory: data.inventory,
                  gender: genderTranslate,
                  category: categoryTranslate,
                  files: data.files,
                  description: data.description,
                  deletedImages: deletedImageIndex,
                },
                initProduct
              );
            } else {
              handleSubmit({
                name: data.name,
                price: data.price,
                color: data.color,
                inventory: data.inventory,
                gender: genderTranslate,
                category: categoryTranslate,
                files: data.files,
                description: data.description,
              });
            }
            handleClose();
          }}
        >
          {({ isSubmitting, errors, touched, values, setFieldValue }) => (
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
                      value={values.gender}
                      sx={{ width: "255px" }}
                      onChange={(e) => {
                        setFieldValue("gender", e.target.value);
                      }}
                      input={<OutlinedInput />}
                      renderValue={(selected: any) => {
                        if (!selected) {
                          return <em>جنسیت</em>;
                        }
                        return selected;
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>جنسیت</em>
                      </MenuItem>
                      <MenuItem value="مردانه">مردانه</MenuItem>
                      <MenuItem value="زنانه">زنانه</MenuItem>
                      <MenuItem value="بچگانه">بچگانه</MenuItem>
                    </Select>
                    {errors.gender && touched.gender && (
                      <ErrorTypographyStyle>
                        {errors.gender}
                      </ErrorTypographyStyle>
                    )}
                  </Box>
                  <Box>
                    <Select
                      displayEmpty
                      value={values.category}
                      sx={{ width: "255px" }}
                      onChange={(e) => {
                        setFieldValue("category", e.target.value);
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
                    {errors.category && touched.category && (
                      <ErrorTypographyStyle>
                        {errors.category}
                      </ErrorTypographyStyle>
                    )}
                  </Box>
                </BoxFormStyle>
                <InputLabel
                  sx={{ color: "primary.main", marginLeft: "80%", mt: 4 }}
                >
                  افزودن تصویر:
                </InputLabel>
                <Input
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={(e) =>
                    setFieldValue("files", (e.target as HTMLInputElement).files)
                  }
                  sx={{ mb: 4, width: "90%" }}
                />

                {errors.files && touched.files && (
                  <ErrorTypographyStyle>{errors.files}</ErrorTypographyStyle>
                )}
                {values.files ? (
                  <Box>
                    <Grid container spacing={1} marginBottom={4}>
                      {Object.values(values.files).map((image) => (
                        <Grid item xs={4}>
                          <img
                            src={URL.createObjectURL(image)}
                            alt=""
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  ""
                )}
                {initProduct ? (
                  <Box>
                    <Grid container spacing={1} marginBottom={4}>
                      {initProduct.images.map((image, index) => (
                        <Grid
                          item
                          xs={4}
                          key={index}
                          position={"relative"}
                          display={
                            deletedImageIndex.findIndex((img: number) => {
                              return img === index;
                            }) !== -1
                              ? "none"
                              : "inline-block"
                          }
                        >
                          <CancelIcon
                            sx={{
                              position: "absolute",
                              "&:hover": { cursor: "pointer" },
                            }}
                            onClick={() =>
                              setDeletedImageIndex([
                                ...deletedImageIndex,
                                index,
                              ])
                            }
                          />
                          <img
                            src={`${BASE_URL}${IMAGES}/${image}`}
                            alt=""
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                ) : (
                  ""
                )}
                <CKEditor
                  initData={`${values.description}`}
                  onChange={({ editor }) => {
                    setFieldValue("description", editor.getData());
                  }}
                />
              </div>
              <DialogActions sx={{ mt: 3, pb: 1, justifyContent: "center" }}>
                <Button
                  variant={"contained"}
                  onClick={handleClose}
                  color="error"
                  sx={{ ml: 3 }}
                  disabled={isSubmitting}
                >
                  انصراف
                </Button>
                <Button
                  variant={"contained"}
                  color="success"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {initProduct ? "ویرایش" : "افزودن"}
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
