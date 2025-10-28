import React from "react";
import { Box, Typography, Card, Grid, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import RedeemIcon from "@mui/icons-material/Redeem";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StarIcon from "@mui/icons-material/Star";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SalesAnalytics from "../Components/SalesAnalytics";
import RecentOrders from "../Components/RecentOrders";
import CustomersOverview from "../Components/CustomersOverview";
import ProductPerformance from "../Components/ProductPerformance";
import RecentlyAddedProducts from "../Components/RecentlyAddedProducts";
import UpcomingEventsOrders from "../Components/UpcomingEventsOrders";
import ReviewsFeedback from "../Components/ReviewsFeedback";

const Dashboard = () => {
  const cards = [
    {
      title: "Total Orders",
      value: "245",
      change: "This Month",
      icon: <CakeIcon sx={{ fontSize: 28 }} />, // Icon for the cake shop theme
      // Soft Pink/Red Gradient (Matches the initial image)
      bgColor: " #FF9A9E ",
    },
    {
      title: "Total Customers",
      value: "1,234",
      change: "Total Registered",
      icon: <PeopleIcon sx={{ fontSize: 28 }} />, // Icon for users/customers
      // Bright Blue Gradient
      bgColor: "#66c2e0",
    },
    {
      title: "Total Revenue",
      value: "$50,230",
      change: "This Month",
      icon: <AttachMoneyIcon sx={{ fontSize: 28 }} />, // Icon for money/revenue
      // Vibrant Green/Teal Gradient
      bgColor: "#6dbd88 ",
    },
    {
      title: "Total Products ",
      value: "120 Items",
      change: "New!",
      icon: <RedeemIcon sx={{ fontSize: 28 }} />, // Icon for products/gifts
      // Pastel Purple Gradient
      bgColor: "#9773c6",
    },
    {
      title: "Pending Orders",
      value: "15 Active",
      change: "Urgent",
      icon: <LocalShippingIcon sx={{ fontSize: 28 }} />, // Icon for shipping/delivery
      // Warm Orange Gradient
      bgColor: " #e3b166",
    },
    {
      title: "Average Rating",
      value: "4.7 ⭐",
      change: "Excellent",
      icon: <StarIcon sx={{ fontSize: 28 }} />, // Icon for rating/stars
      // Bright Yellow/Gold Gradient
      bgColor: " #49a39b",
    },
  ];
  // Sample Bar Chart Data (Orders, Sales, Users)
  const barData = [
    { month: "JAN", orders: 40, sales: 24, users: 30 },
    { month: "FEB", orders: 30, sales: 13, users: 22 },
    { month: "MAR", orders: 20, sales: 28, users: 25 },
    { month: "APR", orders: 27, sales: 20, users: 18 },
    { month: "MAY", orders: 18, sales: 23, users: 20 },
    { month: "JUN", orders: 23, sales: 34, users: 28 },
    { month: "JUL", orders: 34, sales: 22, users: 26 },
    { month: "AUG", orders: 22, sales: 30, users: 24 },
  ];

  // Sample Pie Chart Data (Traffic Sources)
  const pieData = [
    { name: "Search Engines", value: 30, color: "#4FC3F7" },
    { name: "Direct Click", value: 30, color: "#26A69A" },
    { name: "Bookmarks Click", value: 40, color: "#EC407A" },
  ];
  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          flexWrap="wrap"
          gap={2}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton
              sx={{
                background: "linear-gradient(135deg, #ff94a3, #f48fb1)",
                color: "#fff",
                borderRadius: 2,
                width: 40,
                height: 40,
                "&:hover": { opacity: 0.9 },
              }}
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" fontWeight="bold">
              Dashboard
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5}>
            <Typography variant="body1" color="text.secondary">
              Overview
            </Typography>
            <InfoOutlinedIcon
              fontSize="small"
              sx={{ color: "text.secondary" }}
            />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {cards.map((card, index) => (
              <Grid key={index} size={{ xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    minHeight: "150px",
                    maxWidth: "100%",
                    background: card.bgColor,
                    color: "#fff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: "0px 6px 15px rgba(0,0,0,0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0px 12px 25px rgba(0,0,0,0.25)",
                    },
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="subtitle1" fontWeight={500} fontSize={14}>
                      {card.title}
                    </Typography>
                    {card.icon}
                  </Box>
                  <Typography
                    variant="h4"
                    fontSize={22}
                    fontWeight="bold"
                    sx={{ mt: 1, mb: 1 }}
                  >
                    {card.value}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.9 }} fontSize={18}>
                    {card.change}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
        {/* SalesAnalytics */}
        <SalesAnalytics />
        {/* RecentOrders */}
        <RecentOrders />
        {/* CustomersOverview */}
        <CustomersOverview />
        {/* ProductPerformance */}
        <ProductPerformance />
        {/* RecentlyAddedProducts */}
        <RecentlyAddedProducts />
        {/* UpcomingEventsOrders */}
        <UpcomingEventsOrders />
        {/* ReviewsFeedback */}
        <ReviewsFeedback />
      </Box>
    </>
  );
};

export default Dashboard;
