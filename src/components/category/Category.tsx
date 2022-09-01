import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import kid from "assets/kid.png";
import men from "assets/men.png";
import women from "assets/women.png";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const categories: any = [
  {
    image: men,
    title: "مردانه",
    link: "products/men/all",
    width: 230,
    height: 230,
    background: "#F7F7F7",
    paddingTop: 0,
    animation: 1000,
  },
  {
    image: women,
    title: "زنانه",
    link: "products/women/all",
    width: 230,
    height: 230,
    background: "#F7E7F1",
    paddingTop: 0,
    animation: 2000,
  },
  {
    image: kid,
    title: "بچگانه",
    link: "products/kid/all",
    width: 150,
    height: 150,
    background: "#e8e9f3",
    paddingTop: 60,
    animation: 3000,
  },
];

const Category: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <Box
      mt={2}
      sx={{
        paddingX: { sm: 20, xs: 3 },
        paddingY: { sm: 5, xs: 3 },
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Typography fontWeight={"700"} variant={matches ? "h4" : "h3"} mb={5}>
          دسته بندی محصولات
        </Typography>
        <Grid container spacing={matches ? 2 : 10} justifyContent="center">
          {categories.map((category: any) => (
            <Grid
              item
              xs={12}
              md={8}
              lg={4}
              data-aos="fade-up"
              data-aos-duration={category.animation}
            >
              <Card sx={{ backgroundColor: category.background }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    minHeight: "340px",
                    paddingTop: 2,
                    paddingBottom: 5,
                  }}
                >
                  <img
                    style={{
                      width: category.width,
                      height: category.height,
                      paddingTop: category.paddingTop,
                    }}
                    src={category.image}
                    alt=""
                  />
                  <Typography
                    variant="h6"
                    fontWeight={"600"}
                    color="primary"
                    gutterBottom
                    mb={1}
                  >
                    {category.title}
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`${category.link}`)}
                    color="primary"
                  >
                    نمایش محصولات
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Category;
