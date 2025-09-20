import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { verifyEmail } from "../../Api/functions/authFunctions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Typography } from "@mui/material";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        const result = await verifyEmail(token);
        if (result) {
          setVerified(true);
          // ✅ delay redirect so user can see success screen
          setTimeout(() => navigate("/login"), 3000);
        }
      } catch (err) {
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, [token, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        bgcolor: "#f9f9f9",
        px: 2,
      }}
    >
      {loading ? (
        <>
          <CircularProgress size={80} sx={{ mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Verifying your email...
          </Typography>
        </>
      ) : verified ? (
        <>
          <CheckCircleIcon
            sx={{
              fontSize: 100,
              color: "green",
              mb: 2,
              animation: "pop 0.6s ease",
            }}
          />
          <Typography variant="h5" fontWeight="bold">
            Email Verified Successfully 🎉
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Redirecting you to login...
          </Typography>
        </>
      ) : (
        <>
          <ErrorIcon
            sx={{
              fontSize: 100,
              color: "red",
              mb: 2,
              animation: "pop 0.6s ease",
            }}
          />
          <Typography variant="h5" color="error" fontWeight="bold">
            Email Not Verified ❌
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            The verification link may be invalid or expired.  
            Please try again or request a new verification email.
          </Typography>
        </>
      )}

      {/* Animation keyframes */}
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.5); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default VerifyEmail;
