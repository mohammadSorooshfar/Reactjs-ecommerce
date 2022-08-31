import {
  Button,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Paper,
} from "@mui/material";
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
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<{ name: string; value: string }[]>([
    { name: "gender.en", value: gender === "all" ? "" : gender },
    { name: "category.en", value: category === "all" ? "" : category },
    { name: "_sort", value: sortBy },
    { name: "_order", value: order },
  ]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setLoading(true);
    getProductsData(newPage.toString());
    setPage(newPage);
    document.documentElement.scrollTo(0, 0);
  };
  const getProductsData = (page: string) => {
    getProductsService(page, productsPerPage.toString(), filters)
      .then((res) => {
        setProducts(res.data);
        setTotalProducts(+res.total);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getProductsData("1");
  }, [filters]);
  useEffect(() => {
    setFilters([
      { name: "gender.en", value: gender === "all" ? "" : gender },
      { name: "category.en", value: category === "all" ? "" : category },
      { name: "_sort", value: sortBy },
      { name: "_order", value: order },
    ]);
  }, [gender, category, sortBy, order]);

  const changeSort = (sort: string, order: string) => {
    setSortBy(sort);
    setOrder(order);
  };

  return (
    <Paper>
      <Container maxWidth={"lg"} sx={{ paddingTop: 5, paddingBottom: 10 }}>
        <Box display={"flex"} width={"100%"} minHeight={"60vh"}>
          <FilterSide />
          <Box width={"100%"} minHeight={"100%"} marginRight={"1%"}>
            <Toolbar sx={{ borderBottom: "1px solid #5661686d" }}>
              <Typography mb={0}>مرتب سازی:</Typography>
              <Button
                color={sortBy === "createdAt" ? "info" : "primary"}
                sx={{
                  color: (theme) =>
                    sortBy === "createdAt"
                      ? "info.main"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "primary.main",
                }}
                onClick={() => {
                  changeSort("createdAt", "desc");
                }}
              >
                جدید ترین
              </Button>
              <Button
                sx={{
                  color: (theme) =>
                    sortBy === "price" && order === "desc"
                      ? "info.main"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "primary.main",
                }}
                onClick={() => {
                  changeSort("price", "desc");
                }}
              >
                گران ترین
              </Button>
              <Button
                sx={{
                  color: (theme) =>
                    sortBy === "price" && order === "asc"
                      ? "info.main"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "primary.main",
                }}
                onClick={() => {
                  changeSort("price", "asc");
                }}
              >
                ارزان ترین
              </Button>
            </Toolbar>
            <Grid container spacing={3} padding={2}>
              {loading ? (
                <CircularProgress sx={{ margin: "auto", marginTop: "100px" }} />
              ) : products.length ? (
                products.map((product) => (
                  <Grid item sm={4}>
                    <ProductCard product={product} height={"400"} />
                  </Grid>
                ))
              ) : (
                <Typography variant="h4" margin={"auto"} marginTop={"10%"}>
                  محصولی یافت نشد!!
                </Typography>
              )}
            </Grid>
            {products.length && !loading ? (
              <Pagination
                sx={{
                  marginTop: 3,
                  "& .MuiPagination-ul": {
                    marginRight: "45%",
                  },
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "white" : "primary.main",
                }}
                count={Math.ceil(totalProducts / 6)}
                page={page}
                onChange={handleChangePage}
              />
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default Products;
