import CategoryIcon from "@mui/icons-material/Category";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InventoryIcon from "@mui/icons-material/Inventory";
import ListAltIcon from "@mui/icons-material/ListAlt";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
const drawerWidth = 240;

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

const CategorySelect: React.FC<{
  categoryParam?: string;
  genderParam?: string;
}> = ({ categoryParam, genderParam }) => {
  const navigate = useNavigate();
  return (
    <Accordion elevation={0}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>دسته بندی</Typography>
      </AccordionSummary>

      <List>
        {Object.entries(genders).map((gender, index) => (
          <ListItem>
            <Accordion elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{ "&::before": { backgroundColor: "none" } }}
              >
                <Typography>{gender[1]}</Typography>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingRight: 2,
                  width: `${drawerWidth - 80}px`,
                }}
              >
                {Object.entries(categories).map((category, index) => (
                  <Button
                    onClick={() => {
                      navigate(
                        `/tehranshoes/products/${gender[0]}/${category[0]}`
                      );
                      // setOpen(false);
                    }}
                    color={
                      categoryParam === category[0] && genderParam === gender[0]
                        ? "info"
                        : "primary"
                    }
                    size={"large"}
                    variant={
                      categoryParam === category[0] && genderParam === gender[0]
                        ? "contained"
                        : "text"
                    }
                    fullWidth
                  >
                    {category[1]}
                  </Button>
                ))}
              </AccordionDetails>
            </Accordion>
          </ListItem>
        ))}
      </List>
    </Accordion>
  );
};

interface props {}

const FilterSide: React.FC<props> = () => {
  const { category, gender } = useParams();
  const navigate = useNavigate();

  const drawer = (
    <Box>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h5">فیلتر‌ها</Typography>
      </Toolbar>
      <CategorySelect categoryParam={category} genderParam={gender} />
    </Box>
  );
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            border: "1px solid #5661686d",
            borderRadius: "10px",
            backgroundColor: "white",
            position: "static",
            minHeight: "80vh",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="right"
        transitionDuration={0}
        // open={mobileOpen}
        // onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            right: 0,
            borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default FilterSide;
