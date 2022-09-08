import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Button,
  ButtonGroup,
  Drawer,
  Grid,
  InputAdornment,
  InputBase,
  ListItem,
  MenuItemProps,
  Paper,
  Slide,
  styled,
  useScrollTrigger,
  useTheme,
  Collapse,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";
import BoyIcon from "@mui/icons-material/Boy";
import { checkAuth } from "utils/functions.util";
import logoDark from "../../assets/logo1.png";
import logoLight from "../../assets/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { ICart } from "types/interfaces.types";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { changeDark } from "redux/theme";

interface IProps {
  navHeight: string;
}
const genders = {
  men: { name: "مردانه", icon: <ManIcon /> },
  women: { name: "زنانه", icon: <WomanIcon /> },
  kid: { name: "بچگانه", icon: <BoyIcon /> },
};
const categories = {
  sport: "ورزشی",
  sneaker: "کتانی",
  oxford: "رسمی",
};

const NavbarMenu = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const getList = () => (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
        direction: "rtl",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "3px",
          display: "flex",
          alignItems: "center",
          width: "80%",
          marginRight: 2,
          backgroundColor:
            theme.palette.mode === "light" ? "#f0f0f1" : "#2b2b2b",
          backgroundImage: "none",
          marginBottom: 2,
        }}
      >
        <IconButton
          type="button"
          onClick={() => {
            navigate(`/tehranshoes/products/all/all?q=${searchInput}`);
            setSearchInput("");
          }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            "&& .MuiInputBase-input": {
              backgroundColor:
                theme.palette.mode === "light" ? "#f0f0f1" : "#2b2b2b",
            },
          }}
          placeholder="جستجوی کالا"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </Paper>
      {Object.entries(genders).map((gender, index) => (
        <ListItem key={index} sx={{ paddingRight: 0 }}>
          <Accordion
            elevation={0}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1e1e1e" : "white",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{gender[1].name}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
              }}
            >
              {Object.entries(categories).map((category, index) => (
                <Button
                  onClick={() => {
                    navigate(
                      `/tehranshoes/products/${gender[0]}/${category[0]}`
                    );
                    setOpen(false);
                  }}
                >
                  {category[1]}
                </Button>
              ))}
            </AccordionDetails>
          </Accordion>
        </ListItem>
      ))}
    </Box>
  );
  return (
    <Drawer
      transitionDuration={0}
      open={open}
      anchor={"right"}
      onClose={() => setOpen(false)}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        paddingTop="5px"
        alignItems={"center"}
        width="100%"
        marginBottom={2}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e1e1e" : "white",
        }}
      >
        <IconButton
          size="large"
          onClick={() => setOpen(false)}
          color="inherit"
          sx={{
            height: "10px",
            color: theme.palette.mode === "dark" ? "white" : "primary.main",
          }}
        >
          <CloseIcon />
        </IconButton>

        <IconButton
          onClick={() => dispatch(changeDark())}
          sx={{
            color: theme.palette.mode === "dark" ? "white" : "primary.main",
            ml: 2,
          }}
        >
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
          ) : (
            <Brightness4Icon />
          )}
        </IconButton>
      </Box>
      <Box
        height={"100%"}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e1e1e" : "white",
        }}
      >
        {getList()}
      </Box>
    </Drawer>
  );
};

const Header: React.FC<IProps> = ({ navHeight }) => {
  const theme = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("men");
  const [cartItemCounts, setCartItemCounts] = useState(0);
  const [openSearch, setOpenSearch] = useState(false);
  const [anchorElGroups, setAnchorElGroups] =
    React.useState<null | HTMLElement>(null);
  const openGroups = Boolean(anchorElGroups);
  const handleClickGroups = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElGroups(event.currentTarget);
  };
  const handleCloseGroups = () => {
    setAnchorElGroups(null);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartProducts = useSelector((state: any) => state.cart.cartProducts);
  useEffect(() => {
    const totalItems = cartProducts.reduce(
      (prev: number, current: ICart) => prev + current.quantity,
      0
    );
    setCartItemCounts(totalItems);
  }, [cartProducts]);
  useEffect(() => {}, [theme.palette.mode]);
  const LoginManagementButton = styled(Button)<{
    small?: boolean;
  }>(({ theme, small }) => ({
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
    padding: small ? "0 5px " : "0 30px",
    width: small ? "50px" : "35%",
    minHeight: small ? "30px" : "35px",
    fontSize: small ? "10px" : "",
  }));
  const BrandTypographyStyle = styled(Typography)<{}>(({ theme }) => ({
    fontWeight: 700,
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "white" : "black",
    "&:hover": {
      cursor: "pointer",
    },
    fontSize: "26px",
    [theme.breakpoints.down(1024)]: {
      fontSize: "16px",
    },
  }));
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1E1E1E" : "white",
          paddingTop: `calc(${navHeight} / 8)`,
        }}
      >
        <Container maxWidth={theme.breakpoints.down("md") ? false : "xl"}>
          <Toolbar
            disableGutters
            sx={{
              minHeight: `calc(7*${navHeight} /8) !important`,
              width: "100%",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100% !important",
                textAlign: "right",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "calc(100%/3)",
                }}
              >
                <Button
                  onMouseOver={(e) => {
                    if (!openGroups) handleClickGroups(e);
                  }}
                  sx={{
                    color: openGroups
                      ? "error.main"
                      : theme.palette.mode === "dark"
                      ? "white"
                      : "primary.main",
                    fontSize: "16px",
                  }}
                  startIcon={<MenuIcon sx={{ marginLeft: 1 }} />}
                >
                  دسته بندی کالا‌ها
                </Button>
                <Menu
                  anchorEl={anchorElGroups}
                  open={openGroups}
                  onClose={() => {
                    handleCloseGroups();
                  }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <Grid
                    container
                    sx={{
                      width: "400px",
                      height: "170px",
                      padding: "5px",
                    }}
                  >
                    <Grid
                      item
                      sm={4}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                        borderLeft: "1px solid #e8e8e9",
                        width: "100%",
                        paddingLeft: 1,
                      }}
                    >
                      {Object.entries(genders).map((gender) => (
                        <Box
                          key={gender[1].name}
                          sx={{
                            backgroundColor:
                              selectedGender === gender[0]
                                ? theme.palette.mode === "dark"
                                  ? "#f0f0f023"
                                  : "#f0f0f090"
                                : "",
                            width: "100%",
                            height: "calc(100%/3)",
                            display: "flex",
                            alignItems: "center",
                          }}
                          onMouseEnter={() => setSelectedGender(gender[0])}
                        >
                          <Typography
                            sx={{
                              fontWeight: "bold",
                              fontSize: "16px",
                              textDecoration: "none",
                              color:
                                selectedGender === gender[0]
                                  ? "error.main"
                                  : "",
                              "&:hover": {
                                cursor: "default",
                              },
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {gender[1].icon}
                            {gender[1].name}
                          </Typography>
                        </Box>
                      ))}
                    </Grid>
                    <Grid
                      item
                      sm={8}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "flex-start",
                        paddingRight: "10px",
                        width: "100%",
                      }}
                    >
                      {Object.entries(categories).map((category) => (
                        <Link
                          to={`/tehranshoes/products/${selectedGender}/${category[0]}`}
                          style={{
                            textDecoration: "none",
                            color: "inherit",
                          }}
                        >
                          <Typography fontSize="20px">{category[1]}</Typography>
                        </Link>
                      ))}
                    </Grid>
                  </Grid>
                </Menu>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 7,
                  }}
                >
                  <IconButton
                    type="button"
                    onClick={() => {
                      openSearch
                        ? navigate(
                            `/tehranshoes/products/all/all?q=${searchInput}`
                          )
                        : setOpenSearch(true);
                    }}
                  >
                    <SearchIcon />
                  </IconButton>

                  <Collapse in={openSearch} orientation={"horizontal"}>
                    <Paper
                      component="form"
                      sx={{
                        p: "3px",
                        display: "flex",
                        alignItems: "center",
                        width: 200,
                        backgroundColor:
                          theme.palette.mode === "light"
                            ? "#f0f0f1"
                            : "#2b2b2b",
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
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                      <IconButton
                        type="button"
                        onClick={() => {
                          setOpenSearch(false);
                          setSearchInput("");
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </Paper>
                  </Collapse>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "&:hover": { cursor: "pointer" },
                }}
                onClick={() => navigate("/tehranshoes")}
              >
                <Box>
                  <img
                    src={theme.palette.mode === "dark" ? logoDark : logoLight}
                    alt="logo"
                    style={{ width: "40px" }}
                  />
                </Box>
                <BrandTypographyStyle variant="h5" noWrap>
                  کفش طهران
                </BrandTypographyStyle>
              </Box>
              <Box
                sx={{
                  width: "calc(100%/3)",
                  justifyContent: "flex-end",
                  display: "flex",
                }}
              >
                <IconButton
                  onClick={() => dispatch(changeDark())}
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "white" : "primary.main",
                  }}
                >
                  {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                  ) : (
                    <Brightness4Icon />
                  )}
                </IconButton>
                <ButtonGroup
                  variant="contained"
                  sx={{ flexDirection: "row-reverse", width: "70%" }}
                  disableElevation
                >
                  {checkAuth() ? (
                    <LoginManagementButton
                      onClick={() => navigate("/tehranshoes/dashboard/orders")}
                    >
                      مدیریت
                    </LoginManagementButton>
                  ) : (
                    <LoginManagementButton
                      onClick={() => navigate("/tehranshoes/login")}
                    >
                      ورود
                    </LoginManagementButton>
                  )}
                  <Button sx={{ width: "40%" }}>
                    <Badge
                      badgeContent={cartItemCounts}
                      color="secondary"
                      onClick={() => navigate(`/tehranshoes/pay/cart`)}
                    >
                      سبد خرید <ShoppingCartIcon />{" "}
                    </Badge>
                  </Button>
                </ButtonGroup>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                right: 0,
              }}
            >
              <Box sx={{ width: "30%", textAlign: "right" }}>
                <IconButton
                  size="large"
                  onClick={() => setOpen(true)}
                  sx={{
                    color:
                      theme.palette.mode === "dark" ? "white" : "primary.main",
                  }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
              <Typography
                variant="h6"
                onClick={() => navigate("/tehranshoes")}
                sx={{
                  fontWeight: 700,
                  textDecoration: "none",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                کفش طهران
              </Typography>
              <ButtonGroup
                variant="contained"
                sx={{ flexDirection: "row-reverse", width: "30%" }}
                disableElevation
              >
                <Box>
                  {checkAuth() ? (
                    <LoginManagementButton
                      onClick={() => navigate("/tehranshoes/dashboard/orders")}
                      small
                    >
                      مدیریت
                    </LoginManagementButton>
                  ) : (
                    <LoginManagementButton
                      onClick={() => navigate("/tehranshoes/login")}
                      small
                    >
                      ورود
                    </LoginManagementButton>
                  )}
                </Box>
                <Button
                  sx={{
                    padding: "0 5px ",
                    minHeight: "20px",
                    fontSize: "10px",
                    width: "60px",
                  }}
                >
                  <Badge
                    badgeContent={cartItemCounts}
                    color="info"
                    onClick={() => navigate(`/tehranshoes/pay/cart`)}
                    sx={{
                      "& .MuiBadge-badge": {
                        right: "-5px",
                        top: "-3px",
                      },
                    }}
                  >
                    سبد خرید
                  </Badge>
                </Button>
              </ButtonGroup>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <NavbarMenu {...{ open, setOpen }} />
    </>
  );
};
export default Header;
