import {
  Box,
  BoxProps,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Paper,
  styled,
  TextareaAutosize,
  TextField,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrderService } from "services/services.services";
import { ICart } from "types/interfaces.types";
import { persianNumber } from "utils/functions.util";
import * as Yup from "yup";

interface props {}

const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required("نام خود را وارد کنید"),
  family: Yup.string().required("نام خانوادگی خود را وارد کنید"),
  phone: Yup.number().required("شماره خود را وارد کنید"),
  email: Yup.string().email("فرمت ایمیل اشتباه است"),
  address: Yup.mixed().required("آدرس تحویل گیرنده را وارد کنید"),
  requestedDeliveryDate: Yup.mixed().required("تاریخ تحویل را وارد نمایید"),
});

const Checkout: React.FC<props> = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  const totalToPay = useSelector((state: any) => state.cart.totalToPay);
  const BootstrapInput = styled(TextField)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "300px",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
    },
  }));
  const BootstrapBigInput = styled(TextareaAutosize)(({ theme }) => ({
    minWidth: "300px",
    maxWidth: "300px",
    minHeight: "100px",
    maxHeight: "200px",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      border: "1px solid #ced4da",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
    },
  }));
  const BoxFormStyle: any = styled(Box)<BoxProps>(({ theme }) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: "20px 0",
  }));
  const ErrorTypographyStyle: any = styled(Typography)<TypographyProps>(
    ({ theme }) => ({
      color: theme.palette.error.main,
      paddingTop: "5px",
      fontSize: "12px",
    })
  );
  const persianDatePicker = ({
    errors,
    values,
    setFieldValue,
    touched,
  }: any) => {
    return (
      <FormControl>
        <InputLabel
          shrink
          htmlFor="requestedDeliveryDate-input"
          sx={{
            left: "auto",
            fontSize: "15px",
            transform: "translate(-3px, -3.5px)",
          }}
        >
          تاریخ تحویل
        </InputLabel>

        <div style={{ direction: "rtl" }}>
          <DatePicker
            id="requestedDeliveryDate-input"
            calendar={persian}
            locale={persian_fa}
            calendarPosition="top-right"
            value={values.requestedDeliveryDate}
            onChange={(e: any) =>
              setFieldValue("requestedDeliveryDate", e.format())
            }
            minDate={new DateObject()}
            maxDate={new Date(Date.now() + 12096e5)}
            style={{
              marginTop: "20px",
              backgroundColor:
                theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
              color: theme.palette.mode === "light" ? "black" : "white",
            }}
            editable={false}
          />
        </div>
        {errors.requestedDeliveryDate && touched.requestedDeliveryDate && (
          <ErrorTypographyStyle>
            {errors.requestedDeliveryDate}
          </ErrorTypographyStyle>
        )}
      </FormControl>
    );
  };
  return (
    <Container maxWidth={"lg"}>
      <Grid
        container
        spacing={2}
        flexDirection={matches ? "column-reverse" : "row"}
        sx={{ marginTop: matches ? 4 : "" }}
      >
        <Grid item xs={12} md={8}>
          <Paper sx={{ padding: 2 }}>
            {" "}
            <Typography variant="h5" margin={"15px 0"}>
              نهایی کردن خرید
            </Typography>
            <Divider />
            <Formik
              initialValues={{
                name: "",
                family: "",
                phone: "",
                email: "",
                address: "",
                requestedDeliveryDate: new DateObject(),
              }}
              validationSchema={CheckoutSchema}
              onSubmit={(data) => {
                const now = new DateObject({
                  date: new Date(),
                  calendar: persian,
                  locale: persian_fa,
                });
                addOrderService({
                  userDescription: {
                    name: data.name,
                    family: data.family,
                    address: data.address,
                    phone: data.phone,
                  },
                  totalPrice: totalToPay,
                  requestedDeliveryDate:
                    typeof data.requestedDeliveryDate === "string"
                      ? data.requestedDeliveryDate
                      : data.requestedDeliveryDate.format(),
                  deliveryStatus: "notDelivered",
                  orderSubmitDate: now.format(),
                  products: cartProducts,
                })
                  .then(() => navigate("/tehranshoes/pay/payment/successful"))
                  .catch(() => navigate("/tehranshoes/pay/payment/failed"));
              }}
            >
              {({ errors, touched, values, setFieldValue }) => (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h6" textAlign="right" marginTop={3}>
                    اطلاعات شخصی
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginTop: "5px", width: "100%" }}
                    justifyContent={"space-around"}
                  >
                    <Grid item xs={12} md={6}>
                      <FormControl>
                        <InputLabel
                          shrink
                          htmlFor="name-input"
                          sx={{
                            left: "auto",
                            fontSize: "15px",
                            transform: "translate(-3px, -3.5px)",
                          }}
                        >
                          نام
                        </InputLabel>
                        <Field
                          id={"name-input"}
                          name="name"
                          type="text"
                          as={BootstrapInput}
                        />
                        {errors.name && touched.name && (
                          <ErrorTypographyStyle>
                            {errors.name}
                          </ErrorTypographyStyle>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl>
                        <InputLabel
                          shrink
                          htmlFor="family-input"
                          sx={{
                            left: "auto",
                            fontSize: "15px",
                            transform: "translate(-3px, -3.5px)",
                          }}
                        >
                          نام خانوادگی
                        </InputLabel>
                        <Field
                          id={"family-input"}
                          name="family"
                          type="text"
                          as={BootstrapInput}
                        />
                        {errors.family && touched.family && (
                          <ErrorTypographyStyle>
                            {errors.family}
                          </ErrorTypographyStyle>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginTop: "5px", width: "100%" }}
                    justifyContent={"space-around"}
                  >
                    <Grid item xs={12} md={6}>
                      <FormControl>
                        <InputLabel
                          shrink
                          htmlFor="phone-input"
                          sx={{
                            left: "auto",
                            fontSize: "15px",
                            transform: "translate(-3px, -3.5px)",
                          }}
                        >
                          تلفن همراه
                        </InputLabel>
                        <Field
                          id={"phone-input"}
                          name="phone"
                          type="tel"
                          as={BootstrapInput}
                        />
                        {errors.phone && touched.phone && (
                          <ErrorTypographyStyle>
                            {errors.phone}
                          </ErrorTypographyStyle>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      {" "}
                      <FormControl>
                        <InputLabel
                          shrink
                          htmlFor="email-input"
                          sx={{
                            left: "auto",
                            fontSize: "15px",
                            transform: "translate(-3px, -3.5px)",
                          }}
                        >
                          ایمیل
                        </InputLabel>
                        <Field
                          id={"email-input"}
                          name="email"
                          type="text"
                          as={BootstrapInput}
                        />
                        {errors.email && touched.email && (
                          <ErrorTypographyStyle>
                            {errors.email}
                          </ErrorTypographyStyle>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                  <Typography variant="h6" textAlign="right" marginTop={3}>
                    ارسال{" "}
                  </Typography>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginTop: "5px", width: "100%" }}
                    justifyContent={"space-around"}
                  >
                    <Grid item xs={12} md={6}>
                      <FormControl>
                        <InputLabel
                          shrink
                          htmlFor="address-input"
                          sx={{
                            left: "auto",
                            fontSize: "15px",
                            transform: "translate(-3px, -3.5px)",
                          }}
                        >
                          آدرس تحویل گیرنده
                        </InputLabel>
                        <Field
                          id={"address-input"}
                          name="address"
                          type="text"
                          as={BootstrapBigInput}
                        />
                        {errors.address && touched.address && (
                          <ErrorTypographyStyle>
                            {errors.address}
                          </ErrorTypographyStyle>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      {persianDatePicker({
                        errors,
                        values,
                        setFieldValue,
                        touched,
                      })}
                    </Grid>
                  </Grid>
                  <BoxFormStyle>
                    <Button
                      color="success"
                      variant="contained"
                      type="submit"
                      sx={{ width: "60%" }}
                    >
                      پرداخت
                    </Button>
                    <Button
                      color="error"
                      variant="contained"
                      type="submit"
                      sx={{ width: "30%" }}
                      onClick={() =>
                        navigate("/tehranshoes/pay/payment/failed")
                      }
                    >
                      انصراف
                    </Button>
                  </BoxFormStyle>
                </Form>
              )}
            </Formik>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h5" margin={"15px 0"}>
              خرید شما{" "}
            </Typography>
            <Divider />
            {cartProducts.map((product: ICart, index: number) => (
              <>
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  marginY={3}
                >
                  <Typography variant="body1" maxWidth={"50%"}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2">
                    {product.quantity} عدد
                  </Typography>
                  <Typography variant="body1">
                    {persianNumber(
                      (product.quantity * product.price).toString()
                    )}{" "}
                    تومان{" "}
                  </Typography>
                </Box>
                {index === cartProducts.length - 1 ? "" : <Divider />}
              </>
            ))}
            <Divider />
            <Box display={"flex"} justifyContent={"space-between"} marginY={3}>
              <Typography variant="body1" fontWeight={"bold"}>
                هزینه پرداختی
              </Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                {persianNumber(totalToPay.toString())} تومان{" "}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
