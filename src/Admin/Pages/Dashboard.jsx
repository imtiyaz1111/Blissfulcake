import React from "react";
import { Box, Typography, Card, Grid, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DiamondIcon from "@mui/icons-material/Diamond";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const cards = [
    {
      title: "Weekly Sales",
      value: "$ 15,0000",
      change: "Increased by 60%",
      icon: <ShowChartIcon sx={{ fontSize: 28 }} />,
      gradient: "linear-gradient(135deg, #FF758C 0%, #FF7EB3 100%)",
    },
    {
      title: "Weekly Orders",
      value: "45,6334",
      change: "Decreased by 10%",
      icon: <BookmarkIcon sx={{ fontSize: 28 }} />,
      gradient: "linear-gradient(135deg, #56CCF2 0%, #2F80ED 100%)",
    },
    {
      title: "Visitors Online",
      value: "95,5741",
      change: "Increased by 5%",
      icon: <DiamondIcon sx={{ fontSize: 28 }} />,
      gradient: "linear-gradient(135deg, #43E97B 0%, #38F9D7 100%)",
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
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {cards.map((card, index) => (
            <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
              <Card
                sx={{
                  p: 3,
                  borderRadius: 3,
                  width: "100%",
                  maxWidth: "100%",
                  background: card.gradient,
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
                  <Typography variant="subtitle1" fontWeight={500}>
                    {card.title}
                  </Typography>
                  {card.icon}
                </Box>
                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ mt: 1, mb: 1 }}
                >
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {card.change}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  
 
    </>
  );
};

export default Dashboard;
