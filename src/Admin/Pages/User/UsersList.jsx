import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  MenuItem,
  Pagination,
  Switch,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../../context/AuthProvider";
import {
  getAllUsers,
  toggle_isDisable,
} from "../../../Api/functions/authFunctions";
import Loading from "../../../components/Loading/Loading";

const UsersList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [allUserData, setAllUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [auth] = useAuth();
  const token = auth?.token;

  // Fetch all users
  useEffect(() => {
    if (token) {
      getAllUsers(setAllUserData, setLoading, token);
    }
  }, [token]);

  // Pagination states
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Handle Disable Toggle
  const handleToggleDisable = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    const newData = { isDisabled: newStatus };

    try {
      await toggle_isDisable(newData, userId, token);

      setAllUserData((prev) =>
        prev.map((u) =>
          u._id === userId ? { ...u, isDisabled: newStatus } : u
        )
      );
    } catch (error) {
      console.error("Error toggling disable:", error);
    }
  };

  // Filter + Search + Sort
  const filteredUsers = (allUserData || [])
    .filter(
      (u) =>
        u?.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u?.email?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username)
    );

  // Pagination logic
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  return (
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
          <Box
            sx={{
              background: "linear-gradient(135deg, #ff94a3, #f48fb1)",
              color: "#fff",
              borderRadius: 2,
              width: 40,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PersonIcon />
          </Box>
          <Typography variant="h6" fontWeight="bold">
            User List
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography variant="body1" color="text.secondary">
            Overview
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>

      {/* Search + Sort */}
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={2}
        mb={3}
      >
        <TextField
          label="Search User"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ flex: 1, minWidth: 200 }}
        />

        <TextField
          select
          label="Sort"
          variant="outlined"
          size="small"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="asc">A → Z</MenuItem>
          <MenuItem value="desc">Z → A</MenuItem>
        </TextField>
      </Box>

      {/* User Table */}
      {loading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <Loading />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead
              sx={{ background: "linear-gradient(135deg, #ff94a3, #f48fb1)" }}
            >
              <TableRow>
                <TableCell>
                  <strong>No.</strong>
                </TableCell>
                <TableCell>
                  <strong>Username</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Role</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Disable</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user, index) => (
                <TableRow
                  key={user._id}
                  sx={{
                    opacity: user.isDisabled ? 0.5 : 1,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  {/* Serial Number */}
                  <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>

                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.number}</TableCell>
                  <TableCell>{user.role}</TableCell>

                  {/* Active/Inactive Button */}
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: user.isLoggedIn ? "success.main" : "error.main",
                        "&:hover": {
                          bgcolor: user.isLoggedIn
                            ? "success.dark"
                            : "error.dark",
                        },
                      }}
                    >
                      {user.isLoggedIn ? "Online" : "Offline"}
                    </Button>
                  </TableCell>

                  {/* Disable Toggle */}
                  <TableCell align="center">
                    <Switch
                      checked={!user.isDisabled}
                      onChange={() =>
                        handleToggleDisable(user._id, user.isDisabled)
                      }
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
              {paginatedUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    <Typography color="text.secondary">
                      No users found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Pagination */}
      {filteredUsers.length > rowsPerPage && (
        <Box display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default UsersList;
