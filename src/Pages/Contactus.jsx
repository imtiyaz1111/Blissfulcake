import React from 'react'
import CommonBanner from '../components/CommonBanner'
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

const Contactus = () => {
  return (
    <>
      <CommonBanner title="Contact Us" />
       <Box sx={{ py: { xs: 5, md: 8 }, bgcolor: "#fff" }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ textAlign: "left" }}
        >
          Get In Touch{" "}
          <Box
            component="span"
            sx={{
              display: "inline-block",
              width: 50,
              height: 2,
              bgcolor: "grey.400",
              ml: 1,
              mb: 1,
            }}
          />
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="subtitle1"
          fontStyle="italic"
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Do you have anything in your mind to let us know? Kindly don't delay to
          connect to us by means of our contact form.
        </Typography>

        <Grid container spacing={5}>
          {/* Left Side - Form */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ width: "100%" }}
              >
                <TextField
                  fullWidth
                  label="Your Name"
                  variant="outlined"
                  size="medium"
                />
                <TextField
                  fullWidth
                  label="Email Address"
                  variant="outlined"
                  size="medium"
                />
              </Stack>

              <TextField
                fullWidth
                label="Subject"
                variant="outlined"
                size="medium"
              />

              <TextField
                fullWidth
                label="Write message"
                multiline
                rows={5}
                variant="outlined"
              />

              <Button
                variant="contained"
                sx={{
                  bgcolor: "#f48fb1",
                  "&:hover": { bgcolor: "#f06292" },
                  width: { xs: "100%", sm: "200px" },
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                Submit now
              </Button>
            </Stack>
          </Grid>

          {/* Right Side - Contact Info */}
          <Grid item xs={12} md={5}>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Address :
                </Typography>
                <Typography color="text.secondary">
                  54B, Tailstoi Town 5238 <br />
                  La city, IA 522364
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Phone :
                </Typography>
                <Typography color="text.secondary">01372.466.790</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Email :
                </Typography>
                <Typography color="text.secondary">
                  info@cakebakery.com
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle1" fontWeight={700}>
                  Opening Hours :
                </Typography>
                <Typography color="text.secondary">
                  8:00 AM – 10:00 PM <br />
                  Monday – Sunday
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  )
}

export default Contactus
