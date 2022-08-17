import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Drawer,
  ListItem,
  MenuItemProps,
  Slide,
  styled,
  useScrollTrigger,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkAuth } from "utils/functions.util";
import logo from "../../assets/logo.png";

interface Iprops {
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
  oxfords: "رسمی",
};

const Header: React.FC<Iprops> = ({ navHeight }) => {
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(
    null
  );
  const [open, setOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [navOptionColor, setNavOptionColor] = useState({
    men: "black",
    women: "black",
    kid: "black",
  });
  const navigate = useNavigate();
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
          women: "black",
          kid: "black",
          [selected[0]]: "#ffd32a",
        });
      }
    }
  };
  const handleCloseCategoryMenu = () => {
    setNavOptionColor({ men: "black", women: "black", kid: "black" });
    setAnchorElCategory(null);
  };
  const LoginManagementButton = styled(Button)<{
    small?: boolean;
    management?: boolean;
  }>(({ theme, small, management }) => ({
    color: theme.palette.secondary.main,
    backgroundColor: management
      ? theme.palette.info.main
      : theme.palette.primary.main,
    "&:hover": {
      backgroundColor: management ? theme.palette.info.dark : "#000000df",
    },
    padding: small ? "0 5px " : "0 30px",
    width: small ? "" : "13%",
    minHeight: small ? "20px" : "35px",
    fontSize: small ? "10px" : "",
  }));
  const BrandTypographyStyle = styled(Typography)<{}>(({ theme }) => ({
    fontWeight: 700,
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      cursor: "pointer",
    },
    fontSize: "20px",
    [theme.breakpoints.down(1024)]: {
      fontSize: "16px",
    },
  }));
  const CategoryMenu = styled(MenuItem)<MenuItemProps>(() => ({
    color: "black",
    padding: "0 30px",
    width: "200px",
    direction: "rtl",
  }));
  const getList = () => (
    <div style={{ direction: "rtl" }}>
      {Object.entries(genders).map((gender, index) => (
        <ListItem key={index} sx={{ paddingRight: 0 }}>
          <Accordion elevation={0}>
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
    </div>
  );
  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "white" }} elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ maxHeight: navHeight }}>
            <Box
              sx={{
                display: { xs: "none", sm: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
                width: "100% !important",
                textAlign: "right",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <img src={logo} alt="logo" style={{ width: "40px" }} />
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
              {checkAuth() ? (
                <LoginManagementButton
                  onClick={() => navigate("/tehranshoes/dashboard/products")}
                  management
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
            </Box>

            <Box
              sx={{
                display: { xs: "flex", sm: "none" },
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
              >
                کفش طهران
              </Typography>
              <Box sx={{ width: "20%" }}>
                {checkAuth() ? (
                  <LoginManagementButton
                    onClick={() => navigate("/tehranshoes/dashboard/products")}
                    small
                    management
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
