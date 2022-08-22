import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PercentIcon from "@mui/icons-material/Percent";
import VerifiedIcon from "@mui/icons-material/Verified";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { IProduct } from "types/interfaces.types";
import ProductCard from "components/productCard/ProductCard";
import { Link } from "react-router-dom";

const BestSeller: React.FC<{
  products: IProduct[];
  title: string;
  background: string;
  category: string;
}> = ({ products, title, background, category }) => {
  return (
    <Box
      sx={{
        backgroundColor: background,
        paddingX: { sm: 20, xs: 3 },
        paddingY: { sm: 7, xs: 3 },
      }}
      mt={2}
    >
      <Container maxWidth="lg">
        <Link
          to={`/tehranshoes/products/all/${category}`}
          style={{ textDecoration: "none" }}
        >
          <Typography
            fontWeight={"400"}
            variant="h4"
            mb={3}
            textAlign={"right"}
            sx={{ "&:hover": { cursor: "pointer" } }}
            color={"primary"}
          >
            محصولات برتر دسته {title} <ArrowBackIosIcon />
          </Typography>
        </Link>
        <Grid container spacing={2}>
          {products.map((product: IProduct, index: number) => (
            <Grid item sm={4} data-aos="fade-up" data-aos-duration={1000}>
              <ProductCard product={product} height={"500"} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BestSeller;
