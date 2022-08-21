import {
  Box,
  BoxProps,
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

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { IProduct } from "types/interfaces.types";
import {
  CKEditor,
  CKEditorEventHandler,
  prefixEventName,
  useCKEditor,
} from "ckeditor4-react";

function Editor() {
  const [element, setElement] = React.useState<HTMLDivElement | null>(null);
  console.log(element);

  useCKEditor<"customEvent" | "anotherCustomEvent">({
    element,
    dispatchEvent: ({ type }: { type: any }) => {
      if (type === prefixEventName("customEvent")) {
        console.log(type); // '__CKE__customEvent'
      } else {
        console.log(type); // '__CKE__anotherCustomEvent'
      }
    },
    subscribeTo: ["customEvent", "anotherCustomEvent"],
  });

  return <div ref={setElement} />;
}
interface props {
  open: any;
  setOpen: any;
  handleSubmit: any;
  data?: IProduct;
  edit: boolean;
}
const AddModal: React.FC<props> = ({
  open,
  setOpen,
  handleSubmit,
  data,
  edit,
}) => {
  const [files, setFiles] = React.useState<any>([]);
  const [gender, setGender] = React.useState<any>(data ? data.gender.fa : "");
  const [category, setCategory] = React.useState<any>(
    data ? data.category.fa : ""
  );
  const [customErrors, setCustomErrors] = React.useState<any>({});
  const [description, setDescription] = React.useState<any>(
    data ? data.description : ""
  );
  // const [currentImages, setCurrentImages] = React.useState<string[]>(
  //   data ? data.images : ""
  // );
  React.useEffect(() => {
    setFiles([]);
    setCustomErrors({});
    setGender(data ? data.gender.fa : "");
    setCategory(data ? data.category.fa : "");
    setDescription(data ? data.description : "");
  }, [data]);
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
  const DescriptionTextFieldStyle: any = styled(TextField)<TextFieldProps>(
    ({ theme }) => ({
      width: "520px",
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
        {data ? "ویرایش" : "افزودن"} کالا
      </DialogTitle>
      <DialogContent sx={{ textAlign: "center", p: 1 }}>
        <Formik
          initialValues={{
            name: data ? data.name : "",
            color: data ? data.colors[0] : "",
            price: data ? data.price.toString() : "",
            inventory: data ? data.inventory.toString() : "",
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
            if (gender && category && (edit || files.length)) {
              setCustomErrors({});
              const genderTranslate = genderEnglish(gender);
              const categoryTranslate = categoryEnglish(category);
              console.log(data);

              handleSubmit({
                name: data.name,
                price: data.price,
                color: data.color,
                inventory: data.inventory,
                gender: genderTranslate,
                category: categoryTranslate,
                files,
                description: description,
              });

              handleClose();
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
                      <MenuItem disabled value="">
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
                <InputLabel
                  sx={{ color: "primary.main", marginLeft: "80%", mt: 4 }}
                >
                  افزودن تصویر:
                </InputLabel>
                <Input
                  type="file"
                  inputProps={{ multiple: true }}
                  onChange={(e) =>
                    setFiles((e.target as HTMLInputElement).files)
                  }
                  sx={{ mb: 4, width: "90%" }}
                />
                {customErrors.files && (
                  <ErrorTypographyStyle>
                    {customErrors.files}
                  </ErrorTypographyStyle>
                )}
                {/* {data ? (
                  <Grid container spacing={2} marginBottom={4}>
                    {currentImages.map((type: any, indexType: number) =>
                      type.images.map((image: string, indexImage: number) => (
                        <Grid
                          item
                          xs={4}
                          onClick={() => {
                            setCurrentImages((prev: any) => {
                              let current = [...prev];
                              const index = current[indexType].images.findIndex(
                                (img: string) => img === image
                              );
                              console.log(
                                current[indexType].images,
                                index,
                                image
                              );
                              current[indexType].images.splice(index, 1);
                              console.log(current[indexType]);
                              return current;
                            });
                            console.log(type, image);
                          }}
                        >
                          <Avatar
                            variant="rounded"
                            src={`${BASE_URL}${IMAGES}/${image}`}
                            sx={{
                              width: 100,
                              height: 100,
                              mr: "auto",
                              ml: "auto",
                            }}
                          />
                        </Grid>
                      ))
                    )}
                  </Grid>
                ) : (
                  ""
                )} */}
                <CKEditor
                  initData={`${description}`}
                  onChange={({ editor }) => {
                    setDescription(editor.getData());
                  }}
                />
              </div>
              <DialogActions sx={{ mt: 3, pb: 1, justifyContent: "center" }}>
                <Button
                  variant={"contained"}
                  onClick={handleClose}
                  color="error"
                  sx={{ ml: 3 }}
                >
                  انصراف
                </Button>
                <Button variant={"contained"} color="success" type="submit">
                  {data ? "ویرایش" : "افزودن"}
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
