import {
  Avatar,
  Box,
  Card,
  CardContent,
  Container,
  Grid,
  Slide,
  Typography,
} from "@mui/material";
import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PercentIcon from "@mui/icons-material/Percent";
import VerifiedIcon from "@mui/icons-material/Verified";

const offers: any = [
  {
    icon: <AccessTimeIcon sx={{ fontSize: "60px" }} />,
    title: "۷ روز هفته ۲۴ ساعته",
    description:
      " هر روز هفته همه ساعت پاسخگوی مشتریان عریز در کفش طهران میباشیم.",
    animation: 1000,
  },
  {
    icon: <LocalShippingIcon sx={{ fontSize: "60px" }} />,
    title: "ارسال سریع",
    description:
      "ارسال سریع تمامی محصولات به همه نقاط کشور با اکسپرس باکس کفش طهران.",
    animation: 1500,
  },
  {
    icon: <PercentIcon sx={{ fontSize: "60px" }} />,
    title: "تخفیف های استثنائی",
    description:
      "تخفیف های عالی در انتهای هر فصل بر تمامی محصولات پرطرفدار کفش طهران.",
    animation: 2000,
  },
  {
    icon: <VerifiedIcon sx={{ fontSize: "60px" }} />,
    title: " ضمانت اصل بودن کالا ",
    description:
      "بهترین کالا ها را با بهترین قیمت و کیفیت عالی از کفش طهران تهیه نمایید.",
    animation: 2500,
  },
];

const Offer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "secondary.light",
        paddingX: { sm: 20, xs: 3 },
        paddingY: { sm: 7, xs: 3 },
      }}
      mt={2}
    >
      <Container maxWidth="lg">
        <Typography color="error.main" fontWeight={"700"} variant="h3" mb={3}>
          خدمات{" "}
          <Typography
            display={"inline-block"}
            color="primary.main"
            variant="h3"
            fontWeight={"700"}
          >
            کفش طهران
          </Typography>
        </Typography>
        <Grid container spacing={2}>
          {offers.map((offer: any, index: number) => (
            <Grid
              item
              sm={3}
              data-aos="fade-up"
              data-aos-duration={offer.animation}
            >
              <Card elevation={1}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-around",
                    minHeight: "270px",
                    paddingTop: 5,
                    paddingBottom: 15,
                  }}
                >
                  <Avatar
                    sx={{
                      backgroundColor: "secondary.light",
                      color: "primary.main",
                      width: 120,
                      height: 120,
                      mb: 1,
                    }}
                  >
                    {offer.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    fontWeight={"600"}
                    color="warning.dark"
                    gutterBottom
                    mb={1}
                  >
                    {offer.title}
                  </Typography>
                  <Typography>{offer.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Offer;
