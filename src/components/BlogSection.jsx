// BlogSection.js
import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import Marquee from "react-fast-marquee";

const blogs = [
  {
    id: 1,
    title: "5 Healthy Cake Alternatives You’ll Love",
    desc: "Enjoy cakes guilt-free with these healthier yet tasty options.",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80",
    author: "Baker John",
    date: "Aug 12, 2025",
    readTime: "6 min read",
  },
  {
    id: 2,
    title: "The Secret Behind Perfect Cake Frosting",
    desc: "Learn techniques to get smooth, bakery-style frosting every time.",
    image:
      "https://images.unsplash.com/photo-1612197528415-3a23e7c029c6?w=800&q=80",
    author: "Chef Alex",
    date: "July 30, 2025",
    readTime: "7 min read",
  },
  {
    id: 3,
    title: "Top 7 Wedding Cake Trends of 2025",
    desc: "From floral designs to metallic finishes, check out what’s trending.",
    image:
      "https://images.unsplash.com/photo-1612197528415-3a23e7c029c6?w=800&q=80",
    author: "Admin",
    date: "July 15, 2025",
    readTime: "5 min read",
  },
];

const BlogSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 6, md: 8 },
        px: { xs: 2, md: 8 },
        textAlign: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: "#f48fb1", mb: 1 }}
      >
        Latest from Our Blog
      </Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 5 }}>
        Explore tips, ideas, and inspiration for your sweetest moments.
      </Typography>

      {/* Marquee Effect */}
      <Marquee pauseOnHover={true} speed={50} gradient={false}>
        {[...blogs, ...blogs].map((blog, idx) => (
          <Card
            key={idx}
            sx={{
              minWidth: "300px",
              maxWidth: "320px",
              borderRadius: "16px",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              transition: "0.3s",
              mx: 1,
              display: "inline-block",
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
            <CardContent sx={{ textAlign: "left" }}>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", display: "block", mb: 1 }}
              >
                {blog.date} • {blog.author} • {blog.readTime}
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", mb: 1, color: "#333" }}
              >
                {blog.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 2 }}
              >
                {blog.desc}
              </Typography>
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
        ))}
      </Marquee>
    </Box>
  );
};

export default BlogSection;
