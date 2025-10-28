import React from "react";
import { Box, Grid, Paper, Typography, useTheme } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const SalesAnalytics = () => {
  const theme = useTheme();

  // Line chart data for 12 months
  const revenueData = [
    { name: "Jan", revenue: 400 },
    { name: "Feb", revenue: 600 },
    { name: "Mar", revenue: 800 },
    { name: "Apr", revenue: 500 },
    { name: "May", revenue: 900 },
    { name: "Jun", revenue: 700 },
    { name: "Jul", revenue: 1000 },
    { name: "Aug", revenue: 950 },
    { name: "Sep", revenue: 1100 },
    { name: "Oct", revenue: 1200 },
    { name: "Nov", revenue: 1000 },
    { name: "Dec", revenue: 1400 },
  ];

  // Top Selling Cakes data
  const topSellingData = [
    { name: "First Cake", value: 45 },
    { name: "Second Cake", value: 35 },
    { name: "Other", value: 20 },
  ];

  // Payment Methods data
  const paymentMethodsData = [
    { name: "Online", value: 65 },
    { name: "COD", value: 35 },
  ];

  const COLORS = ["#82ca9d", "#8884d8", "#ff9999", "#ffc658"];

  return (
    <Paper
      sx={{
        p: 2,
        mt: 2,
        borderRadius: "12px",
        background: "linear-gradient(180deg, #fff6f9 0%, #ffe6ee 100%)",
        border: "1px solid #ffd6e0",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
      elevation={0}
    >
      <Box sx={{ width: "100%" }}>
        {/* Title */}
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ mb: 2, color: "#d63384" }}
        >
          Sales Analytics
        </Typography>

        <Grid container spacing={3}>
          {/* Revenue Chart */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "16px",
                height: "100%",
                backgroundColor: "#ffffff",
                boxShadow: "0px 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={2}
                sx={{ color: "#000000" }}
              >
                Revenue Over Time
              </Typography>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <XAxis dataKey="name" stroke="#888" fontSize={12} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#a3d0ff"
                    strokeWidth={3}
                    dot={{ r: 4, fill: "#a3d0ff" }}
                    activeDot={{ r: 6 }}
                  />
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="10%"
                        stopColor="#a3d0ff"
                        stopOpacity={0.6}
                      />
                      <stop
                        offset="95%"
                        stopColor="#a3d0ff"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          {/* Orders & Payments */}
          <Grid size={{ xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: "16px",
                backgroundColor: "#ffffff",
                height: "100%",
                boxShadow: "0px 2px 12px rgba(0,0,0,0.05)",
              }}
            >
              <Typography
                variant="subtitle1"
                fontWeight={600}
                mb={2}
                sx={{ color: "#000000" }}
              >
                Orders & Payment Insights
              </Typography>

              <Grid container spacing={2}>
                {/* Top Selling Cakes */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    fontWeight={600}
                    mb={1}
                    sx={{ color: "#000000" }}
                  >
                    Top Selling Cakes
                  </Typography>

                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={topSellingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {topSellingData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <Typography
                    variant="caption"
                    textAlign="center"
                    display="block"
                    color="#555"
                  >
                    First 45% | Second 35% | Other 20%
                  </Typography>
                </Grid>

                {/* Payment Methods */}
                <Grid size={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }}>
                  <Typography
                    variant="body2"
                    textAlign="center"
                    fontWeight={600}
                    mb={1}
                    sx={{ color: "#000000" }}
                  >
                    Payment Methods
                  </Typography>

                  <ResponsiveContainer width="100%" height={140}>
                    <PieChart>
                      <Pie
                        data={paymentMethodsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {paymentMethodsData.map((entry, index) => (
                          <Cell
                            key={`cell2-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <Typography
                    variant="caption"
                    textAlign="center"
                    display="block"
                    color="#555"
                  >
                    Online 65% | COD 35%
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default SalesAnalytics;
