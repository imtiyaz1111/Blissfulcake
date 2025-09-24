import React, { useEffect, useState } from "react";
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
  IconButton,
  Collapse,
  Chip,
  Rating,
  Stack,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentIcon from "@mui/icons-material/Comment";
import ReplyIcon from "@mui/icons-material/Reply";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { baseURL } from "../../../Api/axiosIntance";
import {
  deleteProductById,
  getAllProduct,
  replyToComment,
  updateCommentStatus,
} from "../../../Api/functions/productFunctions";
import { useAuth } from "../../../context/AuthProvider";
import Loading from "../../../components/Loading/Loading";

const AllProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedVariants, setExpandedVariants] = useState({});
  const [comments, setComments] = useState({});
  const [openCommentsDialogFor, setOpenCommentsDialogFor] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [currentCommentForReply, setCurrentCommentForReply] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    productId: null,
  });
  const [auth] = useAuth();
  const token = auth.token;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    getAllProduct(setProducts, setLoading);
  }, []);

  const toggleVariants = (productId) => {
    setExpandedVariants((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  const openCommentsDialog = (product) => {
    setComments((prev) => ({ ...prev, [product._id]: product.reviews || [] }));
    setOpenCommentsDialogFor(product._id);
  };

  const closeCommentsDialog = () => {
    setOpenCommentsDialogFor(null);
    setReplyText("");
    setCurrentCommentForReply(null);
  };

  const changeCommentStatusHandler = async (productId, commentId, status) => {
    await updateCommentStatus(productId, commentId, status, token);
    setComments((prev) => {
      const updated = prev[productId].map((c) =>
        c._id === commentId ? { ...c, status } : c
      );
      return { ...prev, [productId]: updated };
    });
  };

  const openReply = (productId, commentId) => {
    const comment = comments[productId].find((c) => c._id === commentId);
    if (comment) {
      setCurrentCommentForReply({ productId, commentId });
      setReplyText(comment.reply || "");
    }
  };

  const submitReplyHandler = async () => {
    if (!currentCommentForReply) return;
    const { productId, commentId } = currentCommentForReply;
    const newdata = {
      reply: replyText,
    };
    await replyToComment(productId, commentId, newdata, token);
    setComments((prev) => {
      const updated = prev[productId].map((c) =>
        c._id === commentId ? { ...c, reply: replyText } : c
      );
      return { ...prev, [productId]: updated };
    });
    setReplyText("");
    setCurrentCommentForReply(null);
  };

  const confirmDeleteProduct = (productId) => {
    setDeleteModal({ open: true, productId });
  };

  const handleDeleteProduct = async () => {
    const { productId } = deleteModal;
    const success = await deleteProductById(productId, token);
    if (success) {
      setProducts((prev) => prev.filter((p) => p._id !== productId));
    }
    setDeleteModal({ open: false, productId: null });
  };

  const filteredProducts = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
  );
  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

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
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 3,
            }}
          >
            <ShoppingCartIcon />
          </Box>
          <Box>
            <Typography variant="h6" fontWeight="700">
              Product List
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Manage product variants, ratings and comments
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1" color="text.secondary">
            Overview
          </Typography>
          <InfoOutlinedIcon fontSize="small" sx={{ color: "text.secondary" }} />
        </Box>
      </Box>
      {loading == true ? (
        <Loading />
      ) : (
        <>
          {/* Search + Sort */}
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={2}
            mb={3}
          >
            <TextField
              label="Search Product or Category"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              sx={{ flex: 1, minWidth: 220 }}
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

          {/* Product Table */}
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden" }}
          >
            <Table>
              <TableHead
                sx={{ background: "linear-gradient(90deg,#f48fb1,#ff94a3)" }}
              >
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedProducts.map((product, index) => (
                  <React.Fragment key={product._id}>
                    <TableRow>
                      <TableCell>
                        {(page - 1) * rowsPerPage + index + 1}
                      </TableCell>
                      <TableCell>
                        <Avatar
                          variant="rounded"
                          src={`${baseURL}${product.image}`}
                          alt={product.name}
                          sx={{ width: 60, height: 60, borderRadius: 2 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>{product.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          SKU: P-{product._id.toString().padStart(3, "0")}
                        </Typography>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Rating
                            value={product.ratings}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                          <Typography variant="caption" color="text.secondary">
                            {product.ratings}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{product.countInStock}</TableCell>
                      <TableCell>
                        <Tooltip title="Comments">
                          <IconButton
                            size="small"
                            onClick={() => openCommentsDialog(product)}
                          >
                            <CommentIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={1}
                          flexWrap="wrap"
                        >
                          <Button
                            variant="outlined"
                            startIcon={<EditIcon />}
                            size="small"
                            sx={{ borderColor: "#4caf50", color: "#4caf50" }}
                            component={Link}
                            to={`/product/update/${product._id}`}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            startIcon={<DeleteIcon />}
                            onClick={() => confirmDeleteProduct(product._id)}
                          >
                            Delete
                          </Button>
                          <IconButton
                            onClick={() => toggleVariants(product._id)}
                          >
                            <ExpandMoreIcon />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>

                    {/* Collapsible Variants */}
                    <TableRow>
                      <TableCell colSpan={8} sx={{ padding: 0 }}>
                        <Collapse
                          in={!!expandedVariants[product._id]}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box sx={{ margin: 2 }}>
                            <Typography
                              variant="subtitle1"
                              fontWeight={600}
                              mb={1}
                            >
                              Variants / Weight options
                            </Typography>
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Label</TableCell>
                                  <TableCell>Price</TableCell>
                                  <TableCell>Discount Price</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {(product.weights || []).map((v) => (
                                  <TableRow key={v._id}>
                                    <TableCell>{v.label}</TableCell>
                                    <TableCell>₹{v.price}</TableCell>
                                    <TableCell>₹{v.discountedPrice}</TableCell>
                                  </TableRow>
                                ))}
                                {(!product.weights ||
                                  product.weights.length === 0) && (
                                  <TableRow>
                                    <TableCell colSpan={3} align="center">
                                      <Typography color="text.secondary">
                                        No variants available
                                      </Typography>
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
                {paginatedProducts.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      <Typography color="text.secondary">
                        No products found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          {filteredProducts.length > rowsPerPage && (
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Box>
          )}

          {/* Delete Modal */}
          <Dialog
            open={deleteModal.open}
            onClose={() => setDeleteModal({ open: false, productId: null })}
          >
            <DialogTitle>Delete Product</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this product?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setDeleteModal({ open: false, productId: null })}
              >
                Cancel
              </Button>
              <Button color="error" onClick={handleDeleteProduct}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

          {/* Comments Dialog */}
          <Dialog
            open={!!openCommentsDialogFor}
            onClose={closeCommentsDialog}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>
              <Box display="flex" alignItems="center" gap={2}>
                <CommentIcon />
                <Typography variant="h6">
                  Comments for{" "}
                  {products.find((p) => p._id === openCommentsDialogFor)
                    ?.name || ""}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User Name</TableCell>
                      <TableCell>Rating</TableCell>
                      <TableCell>Comment</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Reply</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(comments[openCommentsDialogFor] || []).map((c) => (
                      <TableRow key={c._id}>
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Avatar>{(c.name || "U")[0]}</Avatar>
                            <Box>
                              <Typography fontWeight={600}>{c.name}</Typography>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                ID: {c._id}
                              </Typography>
                            </Box>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Rating
                              value={c.rating}
                              precision={0.5}
                              readOnly
                              size="small"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {c.rating}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{c.comment}</TableCell>
                        <TableCell>
                          <Chip
                            label={c.status}
                            sx={{
                              color: "#fff",
                              backgroundColor:
                                c.status === "approved"
                                  ? "#36bd36"
                                  : c.status === "pending" ||
                                    c.status === "not approved"
                                  ? "red"
                                  : "grey",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {c.reply || (
                              <em style={{ color: "#888" }}>No reply</em>
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Stack
                            direction="row"
                            spacing={1}
                            justifyContent="center"
                          >
                            <Button
                              size="small"
                              color="success"
                              variant={
                                c.status === "approved"
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() =>
                                changeCommentStatusHandler(
                                  openCommentsDialogFor,
                                  c._id,
                                  "approved"
                                )
                              }
                            >
                              Approved
                            </Button>
                            <Button
                              size="small"
                              color="error"
                              variant={
                                c.status === "not approved"
                                  ? "contained"
                                  : "outlined"
                              }
                              onClick={() =>
                                changeCommentStatusHandler(
                                  openCommentsDialogFor,
                                  c._id,
                                  "not approved"
                                )
                              }
                            >
                              Not Approved
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={() =>
                                openReply(openCommentsDialogFor, c._id)
                              }
                            >
                              Reply
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                    {(comments[openCommentsDialogFor] || []).length === 0 && (
                      <TableRow>
                        <TableCell colSpan={6} align="center">
                          <Typography color="text.secondary">
                            No comments yet
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Reply editor */}
              <Box mt={2}>
                <Divider />
                <Box display="flex" gap={2} alignItems="center" mt={2}>
                  <TextField
                    label="Reply"
                    value={replyText}
                    name="reply"
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write your reply here..."
                    fullWidth
                    size="small"
                  />
                  <Button
                    variant="contained"
                    onClick={submitReplyHandler}
                    disabled={!currentCommentForReply}
                  >
                    Save Reply
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setReplyText("");
                      setCurrentCommentForReply(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  mt={1}
                  display="block"
                >
                  Tip: Click Reply on a comment to load it into the reply box
                  for editing.
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeCommentsDialog}>Close</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default AllProductList;
