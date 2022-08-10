import React, { ReactElement, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem, { ListItemProps } from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import ListAltIcon from "@mui/icons-material/ListAlt";

const drawerWidth = 240;
const managementSections = {
  products: {
    persian: "کالا ها",
    icon: <CategoryIcon sx={{ marginRight: "auto" }} />,
  },
  inventory: {
    persian: "موجودی و قیمت ها",
    icon: <InventoryIcon sx={{ marginRight: "auto" }} />,
  },
  orders: {
    persian: "سفارش ها",
    icon: <ListAltIcon sx={{ marginRight: "auto" }} />,
  },
};

const DashboardLayout: React.FC<any> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const ListItemActive = styled(ListItem)<ListItemProps>(({ theme }) => ({
    color: theme.palette.info.main,
    textAlign: "right",
    justifyContent: "space-between",
    "&::before": {
      content: '""',
      width: "5px",
      height: "25px",
      borderRadius: "10px",
      marginRight: "-2.5px",
      backgroundColor: theme.palette.info.main,
    },
  }));

  const drawer = (
    <Box>
      <Toolbar />
      <List>
        {Object.entries(managementSections).map((section, index) =>
          location.pathname === `/tehranshoes/dashboard/${section[0]}` ? (
            <ListItemActive key={section[1].persian} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={section[1].persian}
                  sx={{ textAlign: "right" }}
                />
                <ListItemIcon sx={{ color: "inherit" }}>
                  {section[1].icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItemActive>
          ) : (
            <ListItem key={section[1].persian} disablePadding>
              <ListItemButton
                onClick={() => navigate(`/tehranshoes/dashboard/${section[0]}`)}
              >
                <ListItemText
                  primary={section[1].persian}
                  sx={{ textAlign: "right" }}
                />
                <ListItemIcon sx={{ color: "inherit" }}>
                  {section[1].icon}
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              right: 0,
              borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
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
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h4" noWrap component="div" color={"black"}>
          پنل مدیریت فروشگاه
        </Typography>
        <Box
          sx={{
            mt: "50px",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default DashboardLayout;
