import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import MenuItem from "@mui/material/MenuItem";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { Button, ButtonProps, makeStyles, styled } from "@mui/material";
import { MenuItemProps, MenuProps } from "material-ui";

const genders = {
  men: "مردانه",
  woman: "زنانه",
  kid: "بچگانه",
};
const categories = {
  sport: "ورزشی",
  sneaker: "کتانی",
  oxfords: "رسمی",
};

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElCategory, setAnchorElCategory] =
    React.useState<null | HTMLElement>(null);
  const [selectedGender, setSelectedGender] = React.useState("");
  const [navOptionColor, setNavOptionColor] = React.useState({
    men: "black",
    woman: "black",
    kid: "black",
  });
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
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
          men: "black",
          woman: "black",
          kid: "black",
          [selected[0]]: "#ECB753",
        });
      }
    }
  };
  const handleCloseCategoryMenu = () => {
    setNavOptionColor({ men: "black", woman: "black", kid: "black" });
    setAnchorElCategory(null);
  };
  const LoginButton = styled(Button)<ButtonProps>(() => ({
    color: "white",
    backgroundColor: "black",
    "&:hover": {
      backgroundColor: "#000000df",
    },
    padding: "0 30px",
    width: "13%",
    minHeight: "35px",
  }));
  const CategoryMenu = styled(MenuItem)<MenuItemProps>(() => ({
    color: "black",
    padding: "0 30px",
    width: "200px",
    direction: "rtl",
  }));
  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              alignItems: "center",
              width: "100% !important",
              textAlign: "right",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", width: "13%" }}>
              <Box>
                <img src={logo} alt="logo" style={{ width: "50px" }} />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/tehranshoes"
                sx={{
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                کفش طهران
              </Typography>
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
                      fontSize: "16px",
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
            <LoginButton>Login</LoginButton>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "inherit" }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {Object.entries(genders).map((gender) => (
                  <MenuItem key={gender[1]} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center" fontSize="20px">
                      {gender[1]}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box>
              <Box sx={{ mr: 1 }}>
                <img src={logo} alt="logo" style={{ width: "40px" }} />
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: "inherit",
                  flexGrow: 1,
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                کفش طهران
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
