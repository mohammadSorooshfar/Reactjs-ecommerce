import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemTextProps,
  styled,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
interface props {}

const Footer: React.FC<props> = () => {
  const ListItemTitleText = styled(ListItemText)<ListItemTextProps>(
    ({ theme }) => ({
      textAlign: "right",
      "& span": {
        color: theme.palette.primary.dark,
        fontWeight: "800",
      },
    })
  );
  const ListItemSubtitleText = styled(ListItemText)<ListItemTextProps>(
    ({ theme }) => ({
      textAlign: "right",
      "& span": {
        color: theme.palette.secondary.dark,
      },
    })
  );
  return (
    <Container maxWidth="lg" sx={{ paddingY: 5 }}>
      <Grid container>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemTitleText primary="با کفش طهران" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="اتاق خبر کفش طهران" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="فروش در کفش طهران" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="فرصت های شغلی" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="گزارش تخلف در کفش طهران" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="درباره کفش طهران" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemTitleText primary="خدمات مشتریان" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="پاسخ به پرسش های متداول" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="رویه بازگرداندن کالا" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="شرایط استفاده" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="حریم خصوصی" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemTitleText primary="راهنمای خرید از کفش طهران" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="نحوه ثبت سفارش" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="رویه ارسال سفارش" />
            </ListItem>
            <ListItem>
              <ListItemSubtitleText primary="شیوه های پرداخت" />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={3}>
          <List>
            <ListItem>
              <ListItemTitleText primary="ما را در فضای مجازی دنبال کنید" />
            </ListItem>
            <ListItem>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <InstagramIcon />
                <TwitterIcon />
                <YouTubeIcon />
                <FacebookIcon />
              </Box>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Footer;
