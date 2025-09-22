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
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, NavLink, useNavigate } from "react-router-dom";

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
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import logo from "../assets/blissfulllogo.png";
import { useAuth } from "../context/AuthProvider";
import { logOut } from "../Api/functions/authFunctions";

const Navbar = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  // Breakpoints
  const isBelow1176 = useMediaQuery("(max-width:1176px)");
  const isBelow991 = useMediaQuery("(max-width:991px)");

  const [drawerOpen, setDrawerOpen] = useState(false);

  // User dropdown
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navItems = [
    "Home",
    "Gallery",
    "About Us",
    "Blog",
    "Shop",
    "Contact Us",
  ];

  const getNavLink = (item) => {
    if (item === "Home") return "/";
    return `/${item.replace(/\s+/g, "").toLowerCase()}`;
  };

  // Authentication state
  const [auth, setAuth] = useAuth();
  const token = auth?.token;
  const isLoggedIn = Boolean(token);
  console.log("Auth in Navbar:", auth);

  const handleLogout = () => {
    setDrawerOpen(false);
    handleMenuClose();
    logOut(setAuth, navigate, token);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "#FDEFF1",
        boxShadow: "5px 8px 16px rgba(85, 21, 21, 0.1)",
      }}
    >
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
        <Box sx={{ display: "flex", gap: { xs: 1, md: 3 }, flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <PhoneIcon fontSize="small" /> 000-111-222
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <EmailIcon fontSize="small" /> example@example.com
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TwitterIcon fontSize="small" />
          <FacebookIcon fontSize="small" />
          <PinterestIcon fontSize="small" />
          <InstagramIcon fontSize="small" />
        </Box>
      </Box>

      {/* Main Navbar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar
          sx={{ justifyContent: "space-between", px: { xs: 2, md: 6 }, gap: 2 }}
        >
          {/* Logo */}
          <Box
            component={Link}
            to="/"
            sx={{
              py: 1,
              width: { xs: 70, sm: 90, md: 110 },
              borderRadius: "50%",
              display: "block",
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{ width: "100%", borderRadius: "50%" }}
            />
          </Box>

          {/* -------- >1176px layout -------- */}
          {!isBelow1176 && (
            <>
              {/* Searchbar */}
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
                    "&:hover": {
                      boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
                    },
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

              {/* Menu Items + Cart + Profile */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item}
                    component={NavLink}
                    to={getNavLink(item)}
                    sx={{
                      textAlign: "center",
                      color: "black",
                      "&.active": {
                        backgroundColor: "#f48fb1",
                        color: "white",
                        fontWeight: "bold",
                        borderRadius: "6px",
                      },
                    }}
                  >
                    {item}
                  </Button>
                ))}
                <IconButton color="inherit">
                  <FavoriteBorderIcon />
                </IconButton>
                <IconButton color="inherit">
                  <ShoppingCartOutlinedIcon />
                </IconButton>

                {/* Profile Dropdown */}
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-controls={openMenu ? "profile-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                >
                  {isLoggedIn ? (
                    <Avatar sx={{ bgcolor: "#f48fb1" }}>
                      {auth?.user?.username?.[0]?.toUpperCase()}
                    </Avatar>
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  {!isLoggedIn ? (
                    <>
                      <MenuItem
                        component={Link}
                        to="/login"
                        onClick={handleMenuClose}
                      >
                        Login
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/register"
                        onClick={handleMenuClose}
                      >
                        Register
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        component={Link}
                        to="/profile"
                        onClick={handleMenuClose}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                  )}
                </Menu>
              </Box>
            </>
          )}

          {/* -------- 1176px → 991px layout -------- */}
          {isBelow1176 && !isBelow991 && (
            <>
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
                    maxWidth: 350,
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                  }}
                >
                  <InputBase
                    placeholder="Search..."
                    sx={{ flex: 1, fontSize: "14px" }}
                  />
                  <IconButton>
                    <SearchIcon sx={{ color: "#f48fb1" }} />
                  </IconButton>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton color="inherit">
                  <ShoppingCartOutlinedIcon />
                </IconButton>
                <IconButton
                  color="inherit"
                  onClick={handleMenuOpen}
                  aria-controls={openMenu ? "profile-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                >
                  {isLoggedIn ? (
                    <Avatar sx={{ bgcolor: "#f48fb1" }}>
                      {auth?.user?.username?.[0]?.toUpperCase()}
                    </Avatar>
                  ) : (
                    <AccountCircleIcon />
                  )}
                </IconButton>
                <Menu
                  id="profile-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleMenuClose}
                >
                  {!isLoggedIn ? (
                    <>
                      <MenuItem
                        component={Link}
                        to="/login"
                        onClick={handleMenuClose}
                      >
                        Login
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/register"
                        onClick={handleMenuClose}
                      >
                        Register
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem
                        component={Link}
                        to="/profile"
                        onClick={handleMenuClose}
                      >
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </>
                  )}
                </Menu>
              </Box>

              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon
                  sx={{
                    fontSize: "2rem",
                    color: "red",
                    border: "1px solid red",
                    borderRadius: "5px",
                    p: "4px",
                  }}
                />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{
                    width: 250,
                    height: "100dvh",
                    position: "relative",
                    backgroundColor: "#FDEFF1",
                  }}
                >
                  <IconButton
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                      border: "1px solid red",
                      borderRadius: "50%",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <Box
                    sx={{ mt: 5 }}
                    role="presentation"
                    onClick={() => setDrawerOpen(false)}
                  >
                    <List>
                      {navItems.map((item) => (
                        <ListItem key={item} disablePadding>
                          <ListItemButton
                            component={NavLink}
                            to={getNavLink(item)}
                            sx={{
                              textAlign: "center",
                              color: "black",
                              "&.active": {
                                backgroundColor: "#f48fb1",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "6px",
                              },
                            }}
                          >
                            <ListItemText primary={item} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Drawer>
            </>
          )}

          {/* -------- <991px layout (Drawer) -------- */}
          {isBelow991 && (
            <>
              <IconButton color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon
                  sx={{
                    fontSize: "2rem",
                    color: "red",
                    border: "1px solid red",
                    borderRadius: "5px",
                    p: "4px",
                  }}
                />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
              >
                <Box
                  sx={{
                    width: 250,
                    position: "relative",
                    backgroundColor: "#FDEFF1",
                  }}
                >
                  <IconButton
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "red",
                      border: "1px solid red",
                      borderRadius: "50%",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>

                  <Box sx={{ mt: 5 }}>
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
                          <ListItemButton
                            component={NavLink}
                            to={getNavLink(item)}
                            sx={{
                              textAlign: "center",
                              color: "black",
                              "&.active": {
                                backgroundColor: "#f48fb1",
                                color: "white",
                                fontWeight: "bold",
                                borderRadius: "6px",
                              },
                            }}
                          >
                            <ListItemText primary={item} />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>

                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        pl: "16px",
                      }}
                    >
                      <Button
                        startIcon={<ShoppingCartOutlinedIcon />}
                        component={Link}
                        to="/cart"
                      >
                        Cart
                      </Button>
                      {!isLoggedIn ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <Button
                            startIcon={<AccountCircleIcon />}
                            component={Link}
                            to="/profile"
                          >
                            Profile
                          </Button>
                          <Button
                            startIcon={<AccountCircleIcon />}
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                        </>
                      )}
                    </Box>
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
