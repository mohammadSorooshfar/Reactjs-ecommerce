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
import FilterSide from "components/filterSide/FilterSide";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

interface props {}

const Products: React.FC<props> = () => {
  const location = useLocation();
  const { category, gender } = useParams();
  const navigate = useNavigate();

  return (
    <Container maxWidth={"lg"} sx={{ marginTop: 10, marginBottom: 10 }}>
      <FilterSide />
    </Container>
  );
};

export default Products;
