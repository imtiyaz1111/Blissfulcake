import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Divider,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { styled, useTheme } from "@mui/system";
import { Link } from "react-router-dom";
import { getAllAddress } from "../../Api/functions/addressFunctions";
import { useAuth } from "../../context/AuthProvider";
import Loading from "../../components/Loading/Loading";

// Section title styling
const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: theme.spacing(2),
}));

// Payment option card styling
const PaymentOptionPaper = styled(Paper)(({ selected }) => ({
  padding: "16px",
  border: selected ? "2px solid #FF69B4" : "1px solid #e0e0e0",
  boxShadow: selected ? "0px 0px 10px rgba(255, 105, 180, 0.3)" : "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
  cursor: "pointer",
  transition: "0.3s",
}));

const CheckInfo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();
  const token = auth?.token;

  // Fetch all addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      setLoading(true);
      await getAllAddress(setAllAddresses, token, setLoading);
    };
    fetchAddresses();
  }, [token]);

  // Set default selected address when addresses are loaded
  useEffect(() => {
    if (allAddresses.length > 0 && !selectedAddress) {
      setSelectedAddress(allAddresses[0]);
    }
  }, [allAddresses, selectedAddress]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleOpenAddressMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddressMenu = () => {
    setAnchorEl(null);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    handleCloseAddressMenu();
  };

  return (
    <Box>
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: "8px" }}>
        {/* --- SHIPPING ADDRESS SECTION --- */}
        <SectionTitle variant="h6">Shipping Address</SectionTitle>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <Loading />
          </Box>
        ) : allAddresses.length === 0 ? (
          <>
            <Typography color="text.secondary">
              No addresses found. Please add one below.
            </Typography>
            <Button
              LinkComponent={Link}
              to="/profile/settings/add-address"
              variant="contained"
              sx={{
                mt: 2,
                backgroundImage: "linear-gradient(to right, #fdadbb, #f77f9e)",
                color: "#fff",
              }}
            >
              Add Address
            </Button>
          </>
        ) : (
          <>
            <Typography variant="subtitle1" fontWeight="bold">
              {selectedAddress?.fullName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {selectedAddress?.street}, {selectedAddress?.city},{" "}
              {selectedAddress?.state}, {selectedAddress?.country} -{" "}
              {selectedAddress?.postalCode}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: {selectedAddress?.phone}
            </Typography>

            <Box sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                onClick={handleOpenAddressMenu}
                sx={{
                  borderColor: "#f77f9e",
                  color: "#f77f9e",
                  "&:hover": {
                    borderColor: "#f77f9e",
                    backgroundColor: "rgba(247, 127, 158, 0.08)",
                  },
                }}
              >
                Select Address
              </Button>

              <Button
                LinkComponent={Link}
                to="/profile/settings/add-address"
                variant="contained"
                sx={{
                  backgroundImage:
                    "linear-gradient(to right, #fdadbb, #f77f9e)",
                  color: "#fff",
                }}
              >
                Add Address
              </Button>
            </Box>
          </>
        )}

        {/* --- Address Selection Menu --- */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseAddressMenu}
        >
          {allAddresses.map((address) => (
            <MenuItem
              key={address._id}
              onClick={() => handleSelectAddress(address)}
              selected={selectedAddress?._id === address._id}
            >
              <Box>
                <Typography fontWeight="bold">{address.fullName}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.country} - {address.postalCode}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        <Divider sx={{ my: 3 }} />

        {/* --- PAYMENT METHOD SECTION --- */}
        <SectionTitle variant="h6">Payment Method</SectionTitle>

        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            name="paymentMethod"
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
              }}
            >
              {/* Pay Online */}
              <PaymentOptionPaper
                selected={paymentMethod === "online"}
                onClick={() => setPaymentMethod("online")}
              >
                <FormControlLabel
                  value="online"
                  control={
                    <Radio
                      sx={{
                        color: "#FF69B4",
                        "&.Mui-checked": { color: "#FF69B4" },
                      }}
                    />
                  }
                  label={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography fontWeight="bold">Pay Online</Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <img
                          src="https://img.icons8.com/color/24/visa.png"
                          alt="Visa"
                        />
                        <img
                          src="https://img.icons8.com/color/24/mastercard.png"
                          alt="Mastercard"
                        />
                        <img
                          src="https://img.icons8.com/color/24/upi.png"
                          alt="UPI"
                        />
                      </Box>
                    </Box>
                  }
                />
              </PaymentOptionPaper>

              {/* Cash on Delivery */}
              <PaymentOptionPaper
                selected={paymentMethod === "cod"}
                onClick={() => setPaymentMethod("cod")}
              >
                <FormControlLabel
                  value="cod"
                  control={
                    <Radio
                      sx={{
                        color: "#FF69B4",
                        "&.Mui-checked": { color: "#FF69B4" },
                      }}
                    />
                  }
                  label={
                    <Typography fontWeight="bold">
                      Cash on Delivery (COD)
                    </Typography>
                  }
                />
              </PaymentOptionPaper>
            </Box>
          </RadioGroup>
        </FormControl>
      </Paper>
    </Box>
  );
};

export default CheckInfo;
