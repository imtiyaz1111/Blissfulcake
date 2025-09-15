// Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link } from "react-router-dom"; // for page navigation
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import PinterestIcon from "@mui/icons-material/Pinterest";
import InstagramIcon from "@mui/icons-material/Instagram";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import logo from "../assets/blissfulllogo.png";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // For user dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = ["Home", "Gallery", "About Us", "Blog", "Shop", "Contact Us"];

  // Function to get correct link
  const getNavLink = (item) => {
    if (item === "Home") return "/";
    return `/${item.replace(/\s+/g, "").toLowerCase()}`;
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#FDEFF1" }}>
      {/* Top pink bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f48fb1",
          color: "#fff",
          px: { xs: 2, md: 6 },
          py: 0.5,
          fontSize: "14px",
          flexWrap: "wrap",
        }}
      >
        {/* Left side (phone + email) */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 1, md: 3 },
            flexWrap: "wrap",
            mb: { xs: 1, md: 0 },
            fontSize: { xs: "12px", md: "14px" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PhoneIcon fontSize="small" /> 000-111-222
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EmailIcon fontSize="small" /> example@example.com
          </Box>
        </Box>

        {/* Right side (socials) */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TwitterIcon fontSize="small" />
          <FacebookIcon fontSize="small" />
          <PinterestIcon fontSize="small" />
          <InstagramIcon fontSize="small" />
        </Box>
      </Box>

      {/* Main Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 }, gap: 2 }}>
          {/* Logo (clickable) */}
          <Box
            component={Link}
            to="/"
            sx={{
              py: 1,
              width: { xs: 70, sm: 90, md: 110 },
              height: "auto",
              borderRadius: "50%",
              display: "block",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: "100%",
                height: "auto",
                borderRadius: "50%",
              }}
            />
          </Box>

          {/* Search bar (desktop only) */}
          {!isMobile && (
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                px: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  borderRadius: "25px",
                  px: 2,
                  width: "100%",
                  maxWidth: 450,
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": { boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" },
                }}
              >
                <InputBase
                  placeholder="Search cakes, pastries, chocolates..."
                  sx={{ flex: 1, fontSize: "14px", pl: 1 }}
                />
                <IconButton>
                  <SearchIcon sx={{ color: "#f48fb1" }} />
                </IconButton>
              </Box>
            </Box>
          )}

          {/* Desktop Menu */}
          {!isMobile ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {navItems.map((item) => (
                <Button
                  key={item}
                  component={Link}
                  to={getNavLink(item)}
                  sx={{
                    color: "black",
                    textTransform: "none",
                    fontSize: "16px",
                  }}
                >
                  {item}
                </Button>
              ))}
              {/* Cart Icon */}
              <IconButton color="inherit">
                <ShoppingCartOutlinedIcon />
              </IconButton>
              {/* User Dropdown */}
              <IconButton color="inherit" onClick={handleMenuOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
                  Login
                </MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
                  Register
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              {/* Mobile Hamburger */}
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              {/* Drawer Menu */}
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => setDrawerOpen(false)}
                  onKeyDown={() => setDrawerOpen(false)}
                >
                  {/* Mobile search bar */}
                  <Box sx={{ p: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f1f1f1",
                        borderRadius: "20px",
                        px: 2,
                      }}
                    >
                      <InputBase
                        placeholder="Search..."
                        sx={{ flex: 1, fontSize: "14px" }}
                      />
                      <SearchIcon sx={{ color: "#888" }} />
                    </Box>
                  </Box>

                  <List>
                    {navItems.map((item) => (
                      <ListItem key={item} disablePadding>
                        <ListItemButton component={Link} to={getNavLink(item)}>
                          <ListItemText primary={item} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>

                  {/* Cart & User in Drawer */}
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1, p: 2 }}>
                    <Button
                      startIcon={<ShoppingCartOutlinedIcon />}
                      component={Link}
                      to="/cart"
                    >
                      Cart
                    </Button>
                    <Button
                      startIcon={<AccountCircleIcon />}
                      component={Link}
                      to="/login"
                    >
                      Login
                    </Button>
                    <Button
                      startIcon={<AccountCircleIcon />}
                      component={Link}
                      to="/register"
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
