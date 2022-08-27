import {
  Box,
  BoxProps,
  Container,
  styled,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  alpha,
  InputBase,
  TextareaAutosize,
} from "@mui/material";
import { Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useRef, useState } from "react";
import { disablePastDate, persianNumber } from "utils/functions.util";
import { useDispatch, useSelector } from "react-redux";
import { ICart } from "types/interfaces.types";
import { useNavigate } from "react-router-dom";
import { removeCart } from "redux/cart";

interface props {}

const CheckoutSchema = Yup.object().shape({
  name: Yup.string().required("نام خود را وارد کنید"),
  family: Yup.string().required("نام خانوادگی خود را وارد کنید"),
  phone: Yup.number().required("شماره خود را وارد کنید"),
  email: Yup.string().email("فرمت ایمیل اشتباه است"),
  requestedDeliveryDate: Yup.date(),
});

const Checkout: React.FC<props> = () => {
  const navigate = useNavigate();
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  const total = useSelector((state: any) => state.cart.total);
  const dispatch = useDispatch();
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
      width: "auto",
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
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
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
  return (
    <Container maxWidth={"lg"}>
      <Grid container spacing={2}>
        <Grid item sm={8}>
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
                requestedDeliveryDate: "",
              }}
              validationSchema={CheckoutSchema}
              onSubmit={(data, { setSubmitting }) => {}}
            >
              {({ isSubmitting, errors, touched, values, setFieldValue }) => (
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
                  <BoxFormStyle>
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
                  </BoxFormStyle>
                  <BoxFormStyle>
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
                  </BoxFormStyle>
                  <Typography variant="h6" textAlign="right" marginTop={3}>
                    ارسال{" "}
                  </Typography>
                  <BoxFormStyle>
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
                      <Field
                        id={"requestedDeliveryDate-input"}
                        name="requestedDeliveryDate"
                        type="date"
                        min={disablePastDate()}
                        as={BootstrapInput}
                      />
                      {errors.requestedDeliveryDate &&
                        touched.requestedDeliveryDate && (
                          <ErrorTypographyStyle>
                            {errors.requestedDeliveryDate}
                          </ErrorTypographyStyle>
                        )}
                    </FormControl>
                  </BoxFormStyle>
                  <BoxFormStyle>
                    <Button
                      color="success"
                      variant="contained"
                      type="submit"
                      sx={{ width: "60%" }}
                      onClick={() => {
                        navigate("/tehranshoes/pay/payment/successful");
                      }}
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
        <Grid item sm={4}>
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
                {persianNumber(total.toString())} تومان{" "}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
