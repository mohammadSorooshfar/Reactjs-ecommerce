import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PercentIcon from "@mui/icons-material/Percent";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import men from "assets/men.png";
import women from "assets/women.png";
import kid from "assets/kid.png";

const categories: any = [
  {
    image: men,
    title: "مردانه",
    link: "products/men",
    width: 230,
    height: 230,
    background: "#F7F7F7",
    paddingTop: 0,
  },
  {
    image: women,
    title: "زنانه",
    link: "products/women",
    width: 230,
    height: 230,
    background: "#F7E7F1",
    paddingTop: 0,
  },
  {
    image: kid,
    title: "بچگانه",
    link: "products/kid",
    width: 180,
    height: 180,
    background: "#e8e9f3",
    paddingTop: 30,
  },
];

const Category: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box mt={2} paddingY={5} paddingX={20}>
      <Container maxWidth="lg">
        <Typography fontWeight={"700"} variant="h3" mb={5}>
          دسته بندی محصولات
        </Typography>
        <Grid container spacing={15}>
          {categories.map((category: any) => (
            <Grid item sm={4}>
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
