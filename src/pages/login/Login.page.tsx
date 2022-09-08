import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Checkbox,
  Container,
  ContainerProps,
  FormControlLabel,
  Paper,
  styled,
  TextField,
  TextFieldProps,
  Typography,
  useTheme,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginService } from "services/services.services";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const FormBoxStyle = styled(Box)<BoxProps>(({ theme }) => ({
    position: "absolute",
    top: "50%",
    right: "50%",
    transform: "translate(50%,-50%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: "400px",
  }));
  const FormTextFieldStyle = styled(TextField)<TextFieldProps>(({ theme }) => ({
    width: "400px",
    padding: "16.5px 14px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  }));
  const LoginButtonStyle = styled(Button)<ButtonProps>(({ theme }) => ({
    backgroundColor: theme.palette.info.main,
    width: "400px",
    padding: "5px 10px",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
  }));
  const AvatarStyle = styled(Avatar)<AvatarProps>(({ theme }) => ({
    backgroundColor: theme.palette.info.main,
  }));
  const handleLogin = async (
    data: { username: string; password: string; remember: boolean },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    loginService(data)
      .then(() => {
        toast.success("ورود با موفقیت انجام شد");
        navigate("/tehranshoes/dashboard/orders");
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setSubmitting(false);
          toast.error("نام کاربری یا رمزعبور اشتباه است");
        }
      });
  };
  return (
    <Paper
      sx={{
        width: "100%",
        minHeight: "100vh",
        marginRight: "auto",
        marginLeft: "auto",
        borderRadius: "0px",
      }}
    >
      <FormBoxStyle>
        <AvatarStyle>
          <LockOutlinedIcon />
        </AvatarStyle>
        <Typography variant="h5">ورود به داشبورد</Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
            remember: true,
          }}
          onSubmit={(data, { setSubmitting }) => {
            handleLogin(data, setSubmitting);
          }}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "250px",
                width: "450px",
              }}
            >
              <Box textAlign={"center"}>
                <Field
                  placeholder="نام کاربری"
                  name="username"
                  required
                  type="input"
                  as={FormTextFieldStyle}
                />
                <Field
                  placeholder="رمزعبور"
                  name="password"
                  required
                  type="password"
                  as={FormTextFieldStyle}
                />
              </Box>
              <Box textAlign={"right"} width={"400px"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      defaultChecked
                      onChange={() =>
                        setFieldValue("remember", !values.remember)
                      }
                    />
                  }
                  label="مرا به خاطر بسپار"
                />
              </Box>
              <Box textAlign={"center"}>
                <LoginButtonStyle
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                >
                  ورود
                </LoginButtonStyle>
              </Box>
            </Form>
          )}
        </Formik>
        <Button
          onClick={() => navigate("/")}
          sx={{ color: theme.palette.mode === "dark" ? "white" : "primary" }}
        >
          بازگشت به سایت
        </Button>
      </FormBoxStyle>
    </Paper>
  );
};

export default Login;
