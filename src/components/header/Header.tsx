import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonProps,
  Drawer,
  ListItem,
  MenuItemProps,
  styled,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { palette } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

interface Iprops {
  navHeight: string;
}

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

const Header: React.FC<Iprops> = ({ navHeight }) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(
    null
  );

  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [navOptionColor, setNavOptionColor] = useState({
    men: "black",
    woman: "black",
    kid: "black",
  });
  const navigate = useNavigate();
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
          [selected[0]]: "#FFC23C",
        });
      }
    }
  };
  const handleCloseCategoryMenu = () => {
    setNavOptionColor({ men: "black", woman: "black", kid: "black" });
    setAnchorElCategory(null);
  };
  const LoginButton = styled(Button)<{ small?: boolean }>(
    ({ theme, small }) => ({
      color: theme.palette.secondary.main,
      backgroundColor: "black",
      "&:hover": {
        backgroundColor: "#000000df",
      },
      padding: small ? "0 5px " : "0 30px",
      width: small ? "" : "13%",
      minHeight: small ? "20px" : "35px",
      fontSize: small ? "10px" : "",
    })
  );

  const CategoryMenu = styled(MenuItem)<MenuItemProps>(() => ({
    color: "black",
    padding: "0 30px",
    width: "200px",
    direction: "rtl",
  }));
  const getList = () => (
    <div
      style={{ direction: "rtl" }}
      // onClick={() => setOpen(false)}
    >
      {Object.entries(genders).map((gender, index) => (
        <ListItem key={index} sx={{ paddingRight: 0 }}>
          <Accordion elevation={0}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>{gender[1]}</Typography>
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
    </div>
  );
  return (
    <>
      <AppBar position="fixed" color="transparent" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ maxHeight: navHeight }}>
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
                  onClick={() => navigate("/tehranshoes")}
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
              <LoginButton onClick={() => navigate("/tehranshoes/login")}>
                Login
              </LoginButton>
            </Box>

            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box sx={{ width: "20%", textAlign: "right" }}>
                <IconButton
                  size="large"
                  onClick={() => setOpen(true)}
                  color="inherit"
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
                }}
                color={"#100F0F"}
              >
                کفش طهران
              </Typography>
              <Box sx={{ width: "20%" }}>
                <LoginButton
                  onClick={() => navigate("/tehranshoes/login")}
                  small
                >
                  Login
                </LoginButton>
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
          marginTop="5px"
          alignItems={"center"}
          width="200px"
        >
          <IconButton
            size="large"
            onClick={() => setOpen(false)}
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
          <Box sx={{ mr: 1 }} onClick={() => navigate("/")}>
            <img src={logo} alt="logo" style={{ width: "40px" }} />
          </Box>
        </Box>
        <Container maxWidth="md">{getList()}</Container>
      </Drawer>
    </>
  );
};
export default Header;
