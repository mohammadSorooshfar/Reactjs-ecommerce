import {
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  InputBase,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import debounce from "lodash.debounce";
import FilterListIcon from "@mui/icons-material/FilterList";
import Typography from "@mui/material/Typography";
import FilterSide from "components/filterSide/FilterSide";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import ProductCard from "components/productCard/ProductCard";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductsService } from "services/services.services";
import { IProduct } from "types/interfaces.types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

const Products: React.FC = () => {
  const { category = "", gender = "" } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchedName, setSearchedName] = useState("");
  const [productsPerPage, setProductsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(true);
  const [maxPrice, setMaxPrice] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [colorCheckBox, setColorCheckbox] = useState<string[]>([]);
  const [filterListMobileOpen, setFilterListMobileOpen] = useState(false);
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
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
    console.log(filters);

    getProductsData("1");
  }, [filters]);
  useEffect(() => {
    setFilters([
      { name: "gender.en", value: gender === "all" ? "" : gender },
      { name: "category.en", value: category === "all" ? "" : category },
      { name: "_sort", value: sortBy },
      { name: "_order", value: order },
      { name: "name_like", value: searchedName },
      { name: "price_gte", value: minPrice },
      { name: "price_lte", value: maxPrice },
      { name: "colors_like", value: colorCheckBox.join("|") },
    ]);
    console.log(colorCheckBox.join("|"));
  }, [
    gender,
    category,
    sortBy,
    order,
    searchedName,
    maxPrice,
    minPrice,
    colorCheckBox,
  ]);

  const changeSort = (sort: string, order: string) => {
    setSortBy(sort);
    setOrder(order);
  };
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { value } = e.target;
    if (value === "createdAt desc") {
      changeSort("createdAt", "desc");
    } else if (value === "price desc") {
      changeSort("price", "desc");
    } else {
      changeSort("price", "asc");
    }
  };
  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedName(e.target.value);
  };
  const debouncedSearchChangeHandler = useMemo(
    () => debounce(searchChangeHandler, 500),
    []
  );
  useEffect(() => {
    return () => {
      debouncedSearchChangeHandler.cancel();
    };
  }, []);
  return (
    <Paper>
      <Container maxWidth={"lg"} sx={{ paddingTop: 5, paddingBottom: 10 }}>
        <Box display={"flex"} width={"100%"} minHeight={"60vh"}>
          <FilterSide
            {...{
              setMaxPrice,
              setMinPrice,
              filterListMobileOpen,
              setFilterListMobileOpen,
              setColorCheckbox,
            }}
          />
          <Box width={"100%"} minHeight={"100%"} marginRight={"1%"}>
            <Toolbar
              sx={{
                justifyContent: "space-between",
                borderBottom: "1px solid #5661686d",
                paddingBottom: 2,
              }}
            >
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Paper
                    component="form"
                    sx={{
                      p: "10px",
                      display: "flex",
                      alignItems: "center",
                      width: 300,
                      backgroundColor:
                        theme.palette.mode === "light" ? "#f0f0f1" : "#2b2b2b",
                      marginY: matches ? 3 : 0,
                      backgroundImage: "none",
                    }}
                  >
                    <InputBase
                      sx={{
                        ml: 1,
                        flex: 1,
                        "&& .MuiInputBase-input": {
                          backgroundColor:
                            theme.palette.mode === "light"
                              ? "#f0f0f1"
                              : "#2b2b2b",
                        },
                      }}
                      placeholder="جستجوی کالا"
                      onChange={debouncedSearchChangeHandler}
                    />
                  </Paper>
                </Grid>
                <Grid item xs={8} md={6} display={"flex"} alignItems={"center"}>
                  <Typography mb={0} ml={1} mr={matches ? "" : "auto"}>
                    مرتب سازی:{" "}
                  </Typography>
                  {matches ? (
                    <Select
                      value={`${sortBy} ${order}`}
                      onChange={handleSelectChange}
                      MenuProps={MenuProps}
                    >
                      <MenuItem value={"createdAt desc"}>جدید ترین</MenuItem>
                      <MenuItem value={"price desc"}>گران ترین</MenuItem>
                      <MenuItem value={"price asc"}>ارزان ترین</MenuItem>
                    </Select>
                  ) : (
                    <>
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
                    </>
                  )}
                </Grid>
                <Grid item xs={4} md={0} display={matches ? "" : "none"}>
                  <Button
                    variant="contained"
                    color="info"
                    sx={{
                      marginRight: "auto",
                      height: "100%",
                      width: "90%",
                      fontSize: 14,
                      paddingX: 1,
                    }}
                    endIcon={
                      <FilterListIcon sx={{ marginLeft: 0, marginRight: 1 }} />
                    }
                    onClick={() => setFilterListMobileOpen(true)}
                  >
                    فیلتر ها
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
            <Grid
              container
              spacing={matches ? 2 : 3}
              padding={2}
              justifyContent={matches ? "center" : "flex-start"}
            >
              {loading ? (
                <CircularProgress sx={{ margin: "auto", marginTop: "100px" }} />
              ) : products.length ? (
                products.map((product) => (
                  <Grid item xs={10} md={6} lg={4}>
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
                    justifyContent: "center",
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
