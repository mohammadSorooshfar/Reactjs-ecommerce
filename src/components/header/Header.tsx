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
import { flexbox } from "@mui/system";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const genders = {
  men: "مردانه",
  woman: "زنانه",
  kid: "بچگانه",
  dashboard: "مدیریت",
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
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategory(event.currentTarget);
    const gendersArray = Object.entries(genders);
    const selected: any = gendersArray.find(
      (gender) => gender[1] === event.currentTarget.innerText
    );
    if (selected[0]) {
      console.log(selected[0]);

      setSelectedGender(selected[0]);
    }
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null);
  };

  return (
    <AppBar position="fixed" color="transparent" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "space-between",
              width: "100% !important",
              textAlign: "right",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mr: 1 }}>
                <img src={logo} alt="logo" style={{ width: "50px" }} />
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/tehranshoes"
                sx={{
                  mr: 2,
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
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {Object.values(genders).map((gender) => (
                <Button
                  key={gender}
                  onClick={handleOpenCategoryMenu}
                  sx={{
                    margin: "20px",
                    color: "black",
                    display: "block",
                    fontWeight: "bold",
                    fontSize: "16px",
                    textDecoration: "none",
                  }}
                >
                  {gender}
                </Button>
              ))}
              <Menu
                id="menu-category"
                anchorEl={anchorElCategory}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElCategory)}
                onClose={handleCloseCategoryMenu}
              >
                {Object.entries(categories).map((category) => (
                  <MenuItem key={category[1]} onClick={handleCloseCategoryMenu}>
                    <Link
                      to={`/tehranshoes/products/${selectedGender}/${category[0]}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography fontSize="20px">{category[1]}</Typography>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ flexGrow: 1, display: "inherit" }}>
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
