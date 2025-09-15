import React, { useState } from 'react'
import CommonBanner from '../../components/CommonBanner'
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const blogs = [
  {
    id: 1,
    title: "How to Bake the Perfect Chocolate Cake",
    desc: "Discover the secrets to baking rich and moist chocolate cakes.",
    image:
      "https://images.unsplash.com/photo-1606313564200-1a2f3e5f3b7d?w=800&q=80",
    author: "Chef Mia",
    date: "Aug 20, 2025",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Creative Cupcake Decoration Ideas",
    desc: "Make your cupcakes stand out with these easy decoration tips.",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=800&q=80",
    author: "Sarah Lee",
    date: "Aug 18, 2025",
    readTime: "4 min read",
  },
  {
    id: 3,
    title: "5 Healthy Cake Alternatives You’ll Love",
    desc: "Enjoy cakes guilt-free with these healthier yet tasty options.",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    author: "Baker John",
    date: "Aug 12, 2025",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Secret Behind Perfect Cake Frosting",
    desc: "Learn techniques to get smooth, bakery-style frosting every time.",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
    author: "Chef Alex",
    date: "July 30, 2025",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Top 7 Wedding Cake Trends of 2025",
    desc: "From floral designs to metallic finishes, check out what’s trending.",
    image:
      "https://images.unsplash.com/photo-1612197528415-3a23e7c029c6?w=800&q=80",
    author: "Admin",
    date: "July 15, 2025",
    readTime: "5 min read",
  },
  {
    id: 6,
    title: "The Art of Layering Cakes Like a Pro",
    desc: "Step-by-step guide to achieving beautiful, even cake layers.",
    image:
      "https://images.unsplash.com/photo-1607290817804-1a9e6e9a5e12?w=800&q=80",
    author: "Baker Ella",
    date: "July 1, 2025",
    readTime: "8 min read",
  },
   {
    id: 6,
    title: "The Art of Layering Cakes Like a Pro",
    desc: "Step-by-step guide to achieving beautiful, even cake layers.",
    image:
      "https://images.unsplash.com/photo-1607290817804-1a9e6e9a5e12?w=800&q=80",
    author: "Baker Ella",
    date: "July 1, 2025",
    readTime: "8 min read",
  },
];

const Blogs = () => {
      const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2); // show 2 more each time
  };
  return (
    <>
      <CommonBanner title="Blogs" />
        <Box
      sx={{
        width: "100%",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 8 },
        textAlign: "center",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "#f48fb1",
          mb: 1,
        }}
      >
        Latest from Our Blog
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          mb: 5,
        }}
      >
        Explore tips, ideas, and inspiration for your sweetest moments.
      </Typography>

      {/* Blog Cards */}
      <Grid container spacing={4} justifyContent="center">
        {blogs.slice(0, visibleCount).map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
                transition: "0.3s",
                display: "flex",
                flexDirection: "column",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={blog.image}
                alt={blog.title}
                sx={{
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ textAlign: "left", flexGrow: 1 }}>
                {/* Date & Author */}
                <Typography
                  variant="caption"
                  sx={{ color: "text.secondary", display: "block", mb: 1 }}
                >
                  {blog.date} • {blog.author} • {blog.readTime}
                </Typography>

                {/* Title */}
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
                >
                  {blog.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", mb: 2 }}
                >
                  {blog.desc}
                </Typography>

                {/* Read More */}
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: "#f48fb1",
                    color: "#f48fb1",
                    borderRadius: "20px",
                    px: 2,
                    "&:hover": { bgcolor: "#f48fb1", color: "white" },
                  }}
                >
                  Read More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
      {visibleCount < blogs.length && (
        <Box sx={{ mt: 5 }}>
          <Button
            variant="contained"
            onClick={handleLoadMore}
            sx={{
              bgcolor: "#f48fb1",
              color: "white",
              borderRadius: "25px",
              px: 4,
              py: 1.2,
              fontWeight: "bold",
              "&:hover": { bgcolor: "#f06292" },
            }}
          >
            Load More
          </Button>
        </Box>
      )}

    </Box>
    </>
  )
}

export default Blogs
