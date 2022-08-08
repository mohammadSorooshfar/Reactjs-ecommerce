import React from "react";
import { Formik, Field, Form, useField, FieldAttributes } from "formik";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      sx={{ width: "400px", padding: "16.5px 14px" }}
    />
  );
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: "50%",
          transform: "translate(50%,-50%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <Avatar sx={{ bgcolor: "red" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">ورود به داشبورد</Typography>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // make async call
            console.log("submit: ", data);
            setSubmitting(false);
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
                <MyTextField
                  placeholder="نام کاربری"
                  name="username"
                  required
                />
                <MyTextField placeholder="رمزعبور" name="password" required />
              </div>
              <div>
                <Button
                  variant="contained"
                  sx={{
                    width: "400px",
                    padding: "5px 10px",
                    fontSize: "18px",
                  }}
                  disabled={isSubmitting}
                  type="submit"
                >
                  ورود
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <Button onClick={() => navigate("/")}>بازگشت به سایت</Button>
      </Box>
    </Container>
  );
};

export default Login;
