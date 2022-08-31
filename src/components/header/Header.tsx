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
  ListItem,
  MenuItemProps,
  Paper,
  Slide,
  styled,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  men: "مردانه",
  women: "زنانه",
  kid: "بچگانه",
};
const categories = {
  sport: "ورزشی",
  sneaker: "کتانی",
  oxford: "رسمی",
};

const Header: React.FC<IProps> = ({ navHeight }) => {
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(
    null
  );
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [navOptionColor, setNavOptionColor] = useState({
    men: theme.palette.mode === "dark" ? "white" : "black",
    women: theme.palette.mode === "dark" ? "white" : "black",
    kid: theme.palette.mode === "dark" ? "white" : "black",
  });
  const [cartItemCounts, setCartItemCounts] = useState(0);
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
  useEffect(() => {
    theme.palette.mode === "dark"
      ? setNavOptionColor({
          men: "white",
          women: "white",
          kid: "white",
        })
      : setNavOptionColor({
          men: "black",
          women: "black",
          kid: "black",
        });
  }, [theme.palette.mode]);
  const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (anchorElCategory !== event.currentTarget) {
      setAnchorElCategory(event.currentTarget);
      const gendersArray = Object.entries(genders);
      const selected: any = gendersArray.find(
        (gender) => gender[1] === event.currentTarget.innerText
      );
      if (selected[0]) {
        setSelectedGender(selected[0]);
        setNavOptionColor({
          men: theme.palette.mode === "dark" ? "white" : "black",
          women: theme.palette.mode === "dark" ? "white" : "black",
          kid: theme.palette.mode === "dark" ? "white" : "black",
          [selected[0]]: "#ffd32a",
        });
      }
    }
  };
  const handleCloseCategoryMenu = () => {
    setNavOptionColor({
      men: theme.palette.mode === "dark" ? "white" : "black",
      women: theme.palette.mode === "dark" ? "white" : "black",
      kid: theme.palette.mode === "dark" ? "white" : "black",
    });
    setAnchorElCategory(null);
  };
  const LoginManagementButton = styled(Button)<{
    small?: boolean;
  }>(({ theme, small }) => ({
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.info.main,
    "&:hover": {
      backgroundColor: theme.palette.info.dark,
    },
    padding: small ? "0 5px " : "0 30px",
    width: small ? "" : "40%",
    minHeight: small ? "20px" : "35px",
    fontSize: small ? "10px" : "",
  }));
  const BrandTypographyStyle = styled(Typography)<{}>(({ theme }) => ({
    fontWeight: 700,
    textDecoration: "none",
    color: theme.palette.mode === "dark" ? "white" : "black",
    "&:hover": {
      cursor: "pointer",
    },
    fontSize: "20px",
    [theme.breakpoints.down(1024)]: {
      fontSize: "16px",
    },
  }));
  const CategoryMenu = styled(MenuItem)<MenuItemProps>(({ theme }) => ({
    color: theme.palette.mode === "dark" ? "white" : "black",
    padding: "0 30px",
    width: "200px",
    direction: "rtl",
  }));
  const getList = () => (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1e1e1e" : "white",
        direction: "rtl",
      }}
    >
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
              <Typography color={Object.values(navOptionColor)[index]}>
                {gender[1]}
              </Typography>
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
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1E1E1E" : "white",
        }}
      >
        <Container maxWidth={theme.breakpoints.down("md") ? false : "xl"}>
          <Toolbar
            disableGutters
            sx={{
              maxHeight: navHeight,
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
              <Box sx={{ display: "flex", alignItems: "center", width: "25%" }}>
                <Box>
                  <img
                    src={theme.palette.mode === "dark" ? logoDark : logoLight}
                    alt="logo"
                    style={{ width: "40px" }}
                  />
                </Box>
                <BrandTypographyStyle
                  variant="h6"
                  onClick={() => navigate("/tehranshoes")}
                  noWrap
                >
                  کفش طهران
                </BrandTypographyStyle>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "60%",
                  }}
                >
                  {Object.values(genders).map((gender, index) => (
                    <Button
                      key={gender}
                      onMouseOver={handleOpenCategoryMenu}
                      sx={{
                        color: Object.values(navOptionColor)[index],
                        fontWeight: "bold",
                        fontSize: "14px",
                        textDecoration: "none",
                      }}
                    >
                      {gender}
                    </Button>
                  ))}
                </Box>
                <Menu
                  id="menu-category"
                  anchorEl={anchorElCategory}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElCategory)}
                  onClose={handleCloseCategoryMenu}
                  MenuListProps={{ onMouseLeave: handleCloseCategoryMenu }}
                >
                  {Object.entries(categories).map((category) => (
                    <CategoryMenu
                      key={category[1]}
                      onClick={handleCloseCategoryMenu}
                    >
                      <Link
                        to={`/tehranshoes/products/${selectedGender}/${category[0]}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography fontSize="20px">{category[1]}</Typography>
                      </Link>
                    </CategoryMenu>
                  ))}
                </Menu>
              </Box>
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
                sx={{ flexDirection: "row-reverse", width: "25%" }}
                disableElevation
              >
                {checkAuth() ? (
                  <LoginManagementButton
                    onClick={() => navigate("/tehranshoes/dashboard/products")}
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
                <Button>
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
            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                right: 0,
              }}
            >
              <Box sx={{ width: "20%", textAlign: "right" }}>
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
              <Box sx={{ width: "20%" }}>
                {checkAuth() ? (
                  <LoginManagementButton
                    onClick={() => navigate("/tehranshoes/dashboard/products")}
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
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
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
          width="200px"
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
    </>
  );
};
export default Header;
