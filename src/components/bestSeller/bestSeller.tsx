import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import ProductCard from "components/productCard/ProductCard";
import React from "react";
import { Link } from "react-router-dom";
import { IProduct } from "types/interfaces.types";

const BestSeller: React.FC<{
  products: IProduct[];
  title: string;
  background: string;
  category: string;
}> = ({ products, title, background, category }) => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? undefined : background,
        paddingX: { sm: 20, xs: 3 },
        paddingY: { sm: 5, xs: 3 },
        marginTop: 2,
      }}
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
            sx={{
              "&:hover": { cursor: "pointer" },
              color: (theme) =>
                theme.palette.mode === "dark" ? "white" : "primary.main",
            }}
          >
            محصولات برتر دسته {title} <ArrowBackIosIcon />
          </Typography>
        </Link>
        <Grid container spacing={2}>
          {products.map((product: IProduct, index: number) => (
            <Grid item sm={4} data-aos="fade-up" data-aos-duration={500}>
              <ProductCard product={product} height={"500"} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default BestSeller;
