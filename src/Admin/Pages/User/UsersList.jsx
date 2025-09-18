import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Pagination,
  Switch,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PersonIcon from "@mui/icons-material/Person";

const initialUsers = [
  { id: 1, username: "john_doe", email: "john@example.com", role: "Admin", isDisabled: false },
  { id: 2, username: "jane_smith", email: "jane@example.com", role: "Editor", isDisabled: false },
  { id: 3, username: "mark_jones", email: "mark@example.com", role: "Viewer", isDisabled: true },
  { id: 4, username: "alice_wong", email: "alice@example.com", role: "Editor", isDisabled: false },
  { id: 5, username: "bob_brown", email: "bob@example.com", role: "Viewer", isDisabled: false },
  { id: 6, username: "lucy_lee", email: "lucy@example.com", role: "Admin", isDisabled: false },
];

const UsersList = () => {
  const [users, setUsers] = useState(initialUsers);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination states
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;


  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setOpenDialog(false);
    setSelectedUser(null);
  };

  // Handle Disable Toggle
  const handleToggleDisable = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, isDisabled: !u.isDisabled } : u
      )
    );
  };

  // Filter + Search + Sort
  const filteredUsers = users
    .filter(
      (u) =>
        u.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
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

      {/* Search + Filter */}
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
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ background: "linear-gradient(135deg, #ff94a3, #f48fb1)" }}>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
              <TableCell>
                <strong>Username</strong>
              </TableCell>
              <TableCell>
                <strong>Email</strong>
              </TableCell>
              <TableCell>
                <strong>Role</strong>
              </TableCell>
              <TableCell align="center">
                <strong>Disable</strong>
              </TableCell>
             
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  opacity: user.isDisabled ? 0.5 : 1,
                  transition: "opacity 0.3s ease",
                }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <Switch
                    checked={!user.isDisabled}
                    onChange={() => handleToggleDisable(user.id)}
                    color="primary"
                  />
                </TableCell>
             
              </TableRow>
            ))}
            {paginatedUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary">
                    No users found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UsersList;
