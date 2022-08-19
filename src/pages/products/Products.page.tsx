import { Button, Container, Grid, Pagination } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FilterSide from "components/filterSide/FilterSide";
import ProductCard from "components/productCard/ProductCard";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsService } from "services/services.services";
import { IProduct } from "types/interfaces.types";

const Products: React.FC = () => {
  const { category = "", gender = "" } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState<{ name: string; value: string }[]>([
    { name: "gender.en", value: gender },
    { name: "category.en", value: category === "all" ? "" : category },
  ]);
  const handleChangePage = (event: unknown, newPage: number) => {
    getProductsData(newPage.toString());
    setPage(newPage);
  };
  const getProductsData = (page: string) => {
    getProductsService(page, productsPerPage.toString(), filters)
      .then((res) => {
        setProducts(res.data);
        setTotalProducts(+res.total);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getProductsData("1");
  }, [filters]);
  useEffect(() => {
    setFilters([
      { name: "gender.en", value: gender },
      { name: "category.en", value: category === "all" ? "" : category },
    ]);
  }, [gender, category]);
  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 10, marginBottom: 10 }}>
      <Box display={"flex"} width={"100%"} minHeight={"50vh"}>
        <FilterSide />
        <Box width={"100%"} minHeight={"100%"}>
          <Toolbar sx={{ borderBottom: "1px solid #5661686d" }}>
            <Typography mb={0}>مرتب سازی:</Typography>
            <Button>گران ترین</Button>
            <Button>ارزان ترین</Button>
            <Button>جدید ترین</Button>
          </Toolbar>
          <Grid container spacing={3} padding={2}>
            {products.length ? (
              products.map((product) => (
                <Grid item sm={4}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Typography variant="h4" margin={"auto"} marginTop={"10%"}>
                محصولی یافت نشد!!
              </Typography>
            )}
          </Grid>
          {products.length ? (
            <Pagination
              sx={{
                marginTop: 3,
                "& .MuiPagination-ul": {
                  marginRight: "45%",
                },
              }}
              count={Math.ceil(totalProducts / 6)}
              color="primary"
              page={page}
              onChange={handleChangePage}
            />
          ) : (
            ""
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default Products;
