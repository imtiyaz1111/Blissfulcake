import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  useMediaQuery,
} from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useTheme } from "@mui/material/styles";

const InfoTabs = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const deliveryInfo = [
    "Design and icing of cake may vary from the image shown here since each chef has his/her own way of baking and designing a cake.",
    "Your cake will arrive beautifully fresh for your occasion. We recommend that the cake(s) are stored in a cool dry place.",
    "We have developed a special Mio Amore packaging so that it reaches you in perfect condition.",
    "The chosen delivery time is an estimate and depends on the availability of the product and the destination to which you want the product to be pick up/delivered.",
    "Since cakes are perishable in nature, we attempt delivery of your order only once.",
    "The delivery/pick up cannot be redirected to any other address.",
    "This product is hand delivered and will not be delivered along with courier products.",
  ];

  const careInstructions = [
    "Store the cake in a refrigerator.",
    "Consume the cake within 24 hours.",
    "Keep it away from direct sunlight and heat.",
    "Do not freeze the cake.",
  ];

  const manufactureDetails = [
    "Manufactured and packed by Mio Amore Pvt. Ltd.",
    "Address: 123, Park Street, Kolkata, India.",
    "Customer Care: +91 9876543210",
    "Email: care@mioamore.com",
  ];

  const renderList = (items) => (
    <List sx={{ pl: 1 }}>
      {items.map((item, index) => (
        <ListItem key={index} sx={{ alignItems: "flex-start", p: 0.5 }}>
          <ListItemIcon sx={{ minWidth: 28, mt: 0.6 }}>
            <FiberManualRecordIcon sx={{ fontSize: 8, color: "#8e3cf7" }} />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography
                variant="body1"
                sx={{
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  color: "text.secondary",
                }}
              >
                {item}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );

  const tabContent = [
    { label: "Delivery Information", content: renderList(deliveryInfo) },
    { label: "Care Instructions", content: renderList(careInstructions) },
    { label: "Manufacture Details", content: renderList(manufactureDetails) },
  ];

  return (
    <Container maxWidth="md" sx={{ py: { xs: 3, md: 5 } }}>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          display: "flex",
          flexDirection: "column",
          alignItems: isMobile ? "flex-start" : "center",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={isMobile ? "scrollable" : "standard"}
          scrollButtons="auto"
          aria-label="info tabs"
          sx={{
            width: "100%",
            "& .MuiTabs-indicator": {
              backgroundColor: "#f48fb1", // custom indicator color
            },
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              color: "text.primary",
              "&.Mui-selected": {
                color: "#f48fb1", // selected tab color
              },
            },
          }}
        >
          {tabContent.map((tab, index) => (
            <Tab key={index} label={tab.label} />
          ))}
        </Tabs>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: { xs: "1.3rem", sm: "1.6rem" },
            color: "#232323",
          }}
        >
          {tabContent[value].label}
        </Typography>
        {tabContent[value].content}
      </Box>
    </Container>
  );
};

export default InfoTabs;
