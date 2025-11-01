import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  IconButton,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
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
import { useAuth } from "../../context/AuthProvider";
import { getAllUsers } from "../../Api/functions/authFunctions";
import { getAllOrders } from "../../Api/functions/orderFunctions";
import { getAllProduct } from "../../Api/functions/productFunctions";
import {
  getTotalRevenue,
  getRevenueByPeriod,
} from "../../Api/functions/stripeAnalyticsFunctions";

const Dashboard = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState("all"); // all, day, week, month
  const [auth] = useAuth();
  const token = auth?.token;

  // ✅ Fetch base data and revenue
  useEffect(() => {
    if (!token) return;
    getAllUsers(setAllUsers, setLoading, token);
    getAllOrders(setAllOrders, token, setLoading);
    getAllProduct(setAllProducts, setLoading);

    if (period === "all") {
      getTotalRevenue(setTotalRevenue, token, setLoading);
    } else {
      getRevenueByPeriod(period, setTotalRevenue, token, setLoading);
    }
  }, [token, period]);

  // ✅ Date-based filter function
  const filterDataByPeriod = (data) => {
    if (!data || !Array.isArray(data)) return [];
    if (period === "all") return data;

    const now = new Date();

    return data.filter((item) => {
      const created = new Date(item.createdAt);
      const diffInDays = (now - created) / (1000 * 60 * 60 * 24);

      switch (period) {
        case "day":
          return created.toDateString() === now.toDateString();
        case "week":
          return diffInDays <= 7;
        case "month":
          return diffInDays <= 30;
        default:
          return true;
      }
    });
  };

  // ✅ Apply filters
  const filteredOrders = filterDataByPeriod(allOrders);
  const filteredUsers = filterDataByPeriod(allUsers);
  const filteredProducts = filterDataByPeriod(allProducts);

  // ✅ Calculate counts and stats
  const pendingOrdersCount = filteredOrders.filter(
    (order) => order.orderStatus === "Processing"
  ).length;

  const averageRating =
    filteredProducts.length > 0
      ? (
          filteredProducts.reduce(
            (sum, product) => sum + (product.ratings || 0),
            0
          ) / filteredProducts.length
        ).toFixed(1)
      : 0;

  // ✅ Dashboard summary cards
  const cards = [
    {
      title: "Total Orders",
      value: `${filteredOrders.length}`,
      change:
        period === "all"
          ? "All Time"
          : period === "day"
          ? "Today"
          : period === "week"
          ? "This Week"
          : "This Month",
      icon: <CakeIcon sx={{ fontSize: 28 }} />,
      bgColor: "#FF9A9E",
    },
    {
      title: "Total Customers",
      value: `${filteredUsers.length}`,
      change: "Registered",
      icon: <PeopleIcon sx={{ fontSize: 28 }} />,
      bgColor: "#66c2e0",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue?.toLocaleString() || 0}`,
      change:
        period === "all"
          ? "All Time"
          : period === "day"
          ? "Today"
          : period === "week"
          ? "This Week"
          : "This Month",
      icon: <AttachMoneyIcon sx={{ fontSize: 28 }} />,
      bgColor: "#6dbd88",
    },
    {
      title: "Total Products",
      value: `${filteredProducts.length}`,
      change: "Available",
      icon: <RedeemIcon sx={{ fontSize: 28 }} />,
      bgColor: "#9773c6",
    },
    {
      title: "Pending Orders",
      value: `${pendingOrdersCount}`,
      change: "Pending",
      icon: <LocalShippingIcon sx={{ fontSize: 28 }} />,
      bgColor: "#e3b166",
    },
    {
      title: "Average Rating",
      value: `${averageRating} ⭐`,
      change: "Overall",
      icon: <StarIcon sx={{ fontSize: 28 }} />,
      bgColor: "#49a39b",
    },
  ];

  return (
    <>
      <Box sx={{ p: { xs: 2, sm: 3 }, bgcolor: "#FDEFF1", minHeight: "100vh" }}>
        {/* ===== HEADER ===== */}
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

          {/* Right Side: Overview + Period Selector */}
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="body1" color="text.secondary">
                Overview
              </Typography>
              <InfoOutlinedIcon
                fontSize="small"
                sx={{ color: "text.secondary" }}
              />
            </Box>

            <FormControl
              size="small"
              sx={{
                minWidth: 120,
                background: "#fff",
                borderRadius: 2,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <InputLabel id="period-select-label">Period</InputLabel>
              <Select
                labelId="period-select-label"
                value={period}
                label="Period"
                onChange={(e) => setPeriod(e.target.value)}
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* ===== DASHBOARD CARDS ===== */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {cards.map((card, index) => (
              <Grid key={index} size={{ xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    minHeight: "150px",
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
                  <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2">{card.change}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* ===== OTHER SECTIONS ===== */}
        <SalesAnalytics
          
        />
        <RecentOrders />
        {/* <CustomersOverview users={filteredUsers} period={period} /> */}
        {/* <ProductPerformance products={filteredProducts} period={period} /> */}
        <RecentlyAddedProducts />
        <UpcomingEventsOrders  />
        {/* <ReviewsFeedback products={filteredProducts} period={period} /> */}
      </Box>
    </>
  );
};

export default Dashboard;
