import React, { useEffect, useState } from "react";
import CommonBanner from "../components/CommonBanner";
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
} from "@mui/material";
import { getAllGallery } from "../Api/functions/galleryFunction";
import gallaryImage from "../assets/gallary.png";

const Gallery = () => {
  const [gallaryData, setGallaryData] = useState([]);
  const [visible, setVisible] = useState(8);

  useEffect(() => {
    getAllGallery(setGallaryData);
  }, []);

  return (
    <>
      <CommonBanner title="Gallery" />

      {/* Intro Section */}
      <Box
        sx={{
          width: "100%",
          py: { xs: 5, md: 10 },
          px: { xs: 2, sm: 4, md: 8 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          {/* Left Content */}
          <Box sx={{ flex: { xs: 1, md: 1.2 } }}>
            <Typography
              variant="subtitle1"
              sx={{
                color: "text.secondary",
                fontWeight: 600,
                mb: 1,
                fontSize: { xs: "1rem", md: "1.2rem" },
              }}
            >
              Our Cake Gallery
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                lineHeight: 1.2,
                mb: 2,
                fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" },
              }}
            >
              A sweet glimpse into the world of Blissful Bites.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                mb: 3,
                maxWidth: "550px",
                fontSize: { xs: "1rem", md: "1.15rem" },
                lineHeight: 1.6,
              }}
            >
              At Blissful Bites, every cake is more than just dessert—it’s a
              piece of art crafted with love, passion, and the finest
              ingredients. From elegant wedding cakes to playful birthday
              creations and indulgent everyday treats, our gallery showcases
              the beauty and creativity behind each bake.
            </Typography>
          </Box>

          {/* Right Image */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={gallaryImage}
              alt="Chocolate Cake"
              sx={{
                width: "100%",
                maxWidth: "550px",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>
      </Box>

      {/* Gallery Grid */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: "100%", margin: "0 auto", px: 2}}
      >
        {gallaryData.slice(0, visible).map((item) => (
          <Grid item key={item._id} xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                },
              }}
            >
              <CardMedia
                component="img"
                image={`http://localhost:5000${item.gallaryImage}`}
                alt="Cake Image"
                sx={{
                  width: 350,
                  height: 350,
                  objectFit: "cover",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Load More Button */}
      {visible < gallaryData.length && (
        <Box sx={{ mt: 5, textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#f48fb1",
              color: "white",
              borderRadius: "25px",
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              fontSize: "1rem",
              textTransform: "none",
              "&:hover": { bgcolor: "#d81b60" },
            }}
            onClick={() => setVisible((prev) => prev + 4)}
          >
            Load More
          </Button>
        </Box>
      )}
    </>
  );
};

export default Gallery;
