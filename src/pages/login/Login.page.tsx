import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  AvatarProps,
  Box,
  BoxProps,
  Button,
  ButtonProps,
  Container,
  ContainerProps,
  styled,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginService } from "services/services.services";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const ContainerStyle = styled(Container)<ContainerProps>(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
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
    data: { username: string; password: string },
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);
    loginService(data)
      .then(() => {
        toast.success("ورود با موفقیت انجام شد");
        navigate("/tehranshoes/dashboard/products");
      })
      .catch((e) => {
        if (e.response.status === 400) {
          setSubmitting(false);
          toast.error("نام کاربری یا رمزعبور اشتباه است");
        }
      });
  };
  return (
    <ContainerStyle>
      <FormBoxStyle>
        <AvatarStyle>
          <LockOutlinedIcon />
        </AvatarStyle>
        <Typography variant="h5">ورود به داشبورد</Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            handleLogin(data, setSubmitting);
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
              </div>
              <div>
                <LoginButtonStyle
                  variant="contained"
                  disabled={isSubmitting}
                  type="submit"
                >
                  ورود
                </LoginButtonStyle>
              </div>
            </Form>
          )}
        </Formik>
        <Button onClick={() => navigate("/")}>بازگشت به سایت</Button>
      </FormBoxStyle>
    </ContainerStyle>
  );
};

export default Login;
