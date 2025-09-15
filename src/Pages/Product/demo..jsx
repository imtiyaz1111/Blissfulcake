

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
          gap: 6, // more breathing space
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
              fontSize: { xs: "2.2rem", sm: "2.8rem", md: "3.5rem" }, // bigger
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
              fontSize: { xs: "1rem", md: "1.15rem" }, // slightly bigger
              lineHeight: 1.6,
            }}
          >
           At Blissful Bites, every cake is more than just dessert—it’s a piece of art crafted with love, passion, and the finest ingredients. From elegant wedding cakes to playful birthday creations and indulgent everyday treats, our gallery showcases the beauty and creativity behind each bake.
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
            src={gallary}
            alt="Chocolate Cake"
            sx={{
              width: "100%",
              maxWidth: "550px", // keeps image contained
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
        </Box>
      </Box>
    </Box>
