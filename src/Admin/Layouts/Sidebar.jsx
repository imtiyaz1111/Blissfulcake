import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Avatar,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  TableChart as TableChartIcon,
  PhotoLibrary as PhotoLibraryIcon,
  Category as CategoryIcon,
  RateReview as RateReviewIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Article as ArticleIcon,
  ContactMail as ContactMailIcon,
  MenuOpen as MenuOpenIcon,
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  Add as AddIcon,
  ListAlt as ListAltIcon,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import logo from "../../assets/blissfulllogo.jpg";

const expandedWidth = 240;
const collapsedWidth = 70;

const Sidebar = ({ mobileOpen, handleDrawerToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState("");

  const toggleCollapse = () => setCollapsed(!collapsed);

  const handleDropdownToggle = (menu) => {
    setOpenDropdown(openDropdown === menu ? "" : menu);
  };

  const drawer = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Brand / Logo */}
      <Toolbar
        sx={{
          justifyContent: collapsed ? "center" : "space-between",
          px: 2,
        }}
      >
        {!collapsed && (
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "rgb(255 84 142)" }}
          >
            Admin Panel
          </Typography>
        )}
        <IconButton onClick={toggleCollapse} size="small">
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>

      <Divider />

      {/* Profile Section */}
      {!collapsed && (
        <Box sx={{ textAlign: "center", p: 2 }}>
          <Avatar src={logo} sx={{ width: 60, height: 60, margin: "0 auto" }} />
          <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 600 }}>
            David Grey. H
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Admin
          </Typography>
        </Box>
      )}

      {/* Sidebar Menu */}
      <List sx={{ flexGrow: 1 }}>
        {/* Dashboard */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={NavLink}
            to="/admin/dashboard"
            sx={{
              minHeight: 48,
              justifyContent: collapsed ? "center" : "initial",
              px: 2.5,
              "&.active": { backgroundColor: "#FDEFF1",color:"rgb(255 84 142)" }, // highlight active
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? "auto" : 2,
                justifyContent: "center",
                color: " rgb(255 84 142)",
               
                 
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Dashboard" />}
          </ListItemButton>
        </ListItem>

        {/* Dropdown Menus */}
        {[
          {
            text: "Home Banner",
            icon: <TableChartIcon />,
            submenu: [
              { text: "Add Banner", path: "/banner/add" },
              { text: "Manage Banners", path: "/banner/manage" },
            ],
          },
          {
            text: "Gallery",
            icon: <PhotoLibraryIcon />,
            submenu: [
              { text: "Add Image", path: "/gallery/add" },
              { text: "Manage Gallery", path: "/gallery/manage" },
            ],
          },
          {
            text: "Category",
            icon: <CategoryIcon />,
            submenu: [
              { text: "Add Category", path: "/category/add" },
              { text: "Manage Categories", path: "/category/manage" },
            ],
          },
          {
            text: "Review Image",
            icon: <RateReviewIcon />,
            submenu: [
              { text: "Add Review", path: "/review/add" },
              { text: "Manage Reviews", path: "/review/manage" },
            ],
          },
          {
            text: "User",
            icon: <PeopleIcon />,
            submenu: [
              { text: "Add User", path: "/user/add" },
              { text: "Manage Users", path: "/user/manage" },
            ],
          },
          {
            text: "Product",
            icon: <ShoppingCartIcon />,
            submenu: [
              { text: "Add Product", path: "/product/add" },
              { text: "Manage Products", path: "/product/manage" },
            ],
          },
          {
            text: "Blog",
            icon: <ArticleIcon />,
            submenu: [
              { text: "Add Blog", path: "/blog/add" },
              { text: "Manage Blogs", path: "/blog/manage" },
            ],
          },
        ].map((item) => (
          <Box key={item.text}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleDropdownToggle(item.text)}
                sx={{
                  minHeight: 48,
                  justifyContent: collapsed ? "center" : "initial",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: collapsed ? "auto" : 2,
                    justifyContent: "center",
                     color: " rgb(255 84 142)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!collapsed && <ListItemText primary={item.text} />}
                {!collapsed &&
                  (openDropdown === item.text ? <ExpandLess /> : <ExpandMore />)}
              </ListItemButton>
            </ListItem>
            {/* Submenu */}
            <Collapse
              in={openDropdown === item.text}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.submenu.map((sub) => (
                  <ListItemButton
                    key={sub.text}
                    component={NavLink}
                    to={sub.path}
                    sx={{
                      pl: collapsed ? 2.5 : 6,
                      "&.active": { backgroundColor: "#FDEFF1" },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: collapsed ? "auto" : 2,
                        justifyContent: "center",
                        color: " rgb(255 84 142)",
                      }}
                    >
                      {sub.text.toLowerCase().includes("add") ? (
                        <AddIcon />
                      ) : (
                        <ListAltIcon />
                      )}
                    </ListItemIcon>
                    {!collapsed && <ListItemText primary={sub.text} />}
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </Box>
        ))}

        {/* Contact */}
        <ListItem disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component={NavLink}
            to="/contact"
            sx={{
              minHeight: 48,
              justifyContent: collapsed ? "center" : "initial",
              px: 2.5,
              "&.active": { backgroundColor: "#FDEFF1" },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: collapsed ? "auto" : 2,
                justifyContent: "center",
                 color: " rgb(255 84 142)",
              }}
            >
              <ContactMailIcon />
            </ListItemIcon>
            {!collapsed && <ListItemText primary="Contact" />}
          </ListItemButton>
        </ListItem>
      </List>

      {/* Footer small logo/text */}
      {!collapsed && (
        <Box sx={{ textAlign: "center", p: 2, fontSize: "0.8rem", color: "gray" }}>
          © 2025 Purple
        </Box>
      )}
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: collapsed ? collapsedWidth : expandedWidth },
        flexShrink: { md: 0 },
      }}
    >
      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: expandedWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: collapsed ? collapsedWidth : expandedWidth,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
