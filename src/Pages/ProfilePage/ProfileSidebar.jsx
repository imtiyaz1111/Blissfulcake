import React, { useState, useEffect } from "react";
import {
  Box,
  Avatar,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
} from "@mui/material";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { getProfile } from "../../Api/functions/profileFunctions";
import { baseURL } from "../../Api/axiosIntance";

const navItems = [
  {
    text: "Account Settings",
    icon: <SettingsIcon />,
    to: "/profile/settings",
    subItems: [
      { text: "My Profile", to: "/profile/settings/myprofile" },
      { text: "Edit Profile", to: "/profile/settings/edit" },
      { text: "Add Address", to: "/profile/settings/add-address" },
    ],
  },
  {
    text: "Order",
    icon: <ShoppingBagIcon />,
    to: "/profile/orders",
    subItems: [{ text: "Order Lists", to: "/profile/orders" }],
  },
  {
    text: "Payments",
    icon: <AccountBalanceWalletIcon />,
    to: "/profile/transactions",
    subItems: [{ text: "Transaction List", to: "/profile/transactions" }],
  },
];

const ProfileSidebar = ({ onLinkClick }) => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [auth] = useAuth();
  const token = auth?.token;

  useEffect(() => {
    getProfile(setProfileData, token, setLoading);
  }, []);
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  // Automatically open the parent menu for the current route
  useEffect(() => {
    const activeParent = navItems.find((item) =>
      item.subItems?.some((sub) => location.pathname.startsWith(sub.to))
    );
    if (activeParent) {
      setOpenMenus((prev) => ({ ...prev, [activeParent.text]: true }));
    } else {
      // Default open "Account Settings" and "My Profile" if nothing matches
      setOpenMenus({ "Account Settings": true });
    }
  }, [location.pathname]);

  const handleToggle = (text) => {
    setOpenMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  return (
    <Box
      sx={{
        width: { xs: 250, lg: "100%" },
        textAlign: "center",
        background: "linear-gradient(180deg, #ff91a4, #f871a0)",
        color: "white",
        height: "100%",
        p: 3,
        borderRadius: 2,
       
      }}
    >
      <Avatar
        src={`${baseURL}${profileData.profileImage}`}
        alt="Profile"
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 2,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
      />
      <Typography variant="h6" fontWeight={600}>
        {profileData.username}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>
        {profileData.email}
      </Typography>

      <Divider sx={{ mb: 2, backgroundColor: "rgba(255,255,255,0.5)" }} />

      <List>
        {navItems.map((item) => (
          <Box key={item.text}>
            <ListItemButton
              onClick={() =>
                item.subItems ? handleToggle(item.text) : onLinkClick()
              }
              component={!item.subItems ? NavLink : "button"}
              to={!item.subItems ? item.to : undefined}
              sx={{
                borderRadius: 2,
                mb: 1,
                transition: "0.3s",
                backgroundColor:
                  location.pathname === item.to
                    ? "rgba(255,255,255,0.3)"
                    : "transparent",
                "&:hover": { backgroundColor: "rgba(255,255,255,0.25)" },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subItems &&
                (openMenus[item.text] ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            {item.subItems && (
              <Collapse in={openMenus[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding sx={{ pl: 4 }}>
                  {item.subItems.map((subItem) => {
                    const isActive = location.pathname === subItem.to;
                    return (
                      <ListItemButton
                        key={subItem.text}
                        component={NavLink}
                        to={subItem.to}
                        onClick={onLinkClick}
                        sx={{
                          mb: 1,
                          borderRadius: 2,
                          backgroundColor: isActive
                            ? "rgba(255,255,255,0.3)"
                            : "transparent",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.25)",
                          },
                        }}
                      >
                        <ListItemText primary={subItem.text} />
                      </ListItemButton>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default ProfileSidebar;
