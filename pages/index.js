import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import knowledgeThumb from "../public/images/knowledge-thumb.png";
import clientThumb from "../public/images/client-thumb.png";
import { Avatar, Box, Container, Divider, Grid, Paper } from "@mui/material";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FAQS from "../Components/mainPage/FAQS";
import Head from "next/head";
export default function Home() {
  return (
    <>
      <Head>
        <meta name="keywords" content="Trabanwaan, Albay, crowdsourcing" />
      </Head>
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Grid container sx={{ pt: 1 }}>
          <Grid
            container
            height={"95vh"}
            alignItems="center"
            justifyContent={"center"}
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 2, md: 12 }}
          >
            <Grid item xs={6}>
              <Typography variant="h2" align="center">
                Find your Worker or Client anywhere here in Albay
              </Typography>
              {/*             <Typography variant="h6">
              Book schedule and meet your worker here in trabanwaan
            </Typography> */}
              <Box textAlign="center">
                <Button variant="contained" size="large">
                  Explore
                </Button>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Image src={knowledgeThumb} width={500} height={500} />
            </Grid>
          </Grid>
        </Grid>
      </Container>

      <Paper elevation={4}>
        <Container maxWidth="lg" sx={{ p: 2 }}>
          <Grid
            container
            alignItems="center"
            direction={"column"}
            sx={{ pt: 2 }}
          >
            <Grid item xs={12}>
              <Typography variant="h2" align="center">
                We help you reach your audience with our platform
              </Typography>
              <Image
                src={clientThumb}
                layout="responsive"
                width={500}
                height={200}
              />
            </Grid>
          </Grid>
        </Container>
      </Paper>
      {/* Featured workers */}
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid container spacing={2} alignItems="center" sx={{ pt: 2 }}>
          <Grid item xs={12}>
            <Typography variant="h2" align="center">
              Featured workers
            </Typography>
            <Typography variant="body1" align="center">
              Here are some of the featured workers in Albay.
            </Typography>
          </Grid>

          <Grid
            item
            container
            spacing={2}
            justifyContent={"center"}
            alignItems="center"
          >
            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://firebasestorage.googleapis.com/v0/b/my-app-adeeb.appspot.com/o/userProfile%2FuserEmail%2FJPEG_20180629_111506.jpg?alt=media&token=29a03b60-7638-4ec0-ac2d-061214c45f3e"
                  alt="A"
                />
                <CardContent>
                  <Typography variant="h5">FirstName LastName</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "4",
                      WebkitBoxOrient: "vertical",
                    }}
                    color="text.secondary"
                  >
                    Introduction: Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://firebasestorage.googleapis.com/v0/b/my-app-adeeb.appspot.com/o/userProfile%2FuserEmail%2FJPEG_20180629_111506.jpg?alt=media&token=29a03b60-7638-4ec0-ac2d-061214c45f3e"
                  alt="A"
                />
                <CardContent>
                  <Typography variant="h5">FirstName LastName</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "4",
                      WebkitBoxOrient: "vertical",
                    }}
                    color="text.secondary"
                  >
                    Introduction: Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>

            <Grid item>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  height="250"
                  image="https://firebasestorage.googleapis.com/v0/b/my-app-adeeb.appspot.com/o/userProfile%2FuserEmail%2FJPEG_20180629_111506.jpg?alt=media&token=29a03b60-7638-4ec0-ac2d-061214c45f3e"
                  alt="A"
                />
                <CardContent>
                  <Typography variant="h5">FirstName LastName</Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "4",
                      WebkitBoxOrient: "vertical",
                    }}
                    color="text.secondary"
                  >
                    Introduction: Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      {/* FAQS */}
      <Container maxWidth="lg" sx={{ pt: 10 }}>
        <Grid container spacing={2} alignItems="center" sx={{ pt: 2 }}>
          <Container maxWidth="md">
            <Typography
              variant="subtitle2"
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              FAQS
            </Typography>
            <Typography variant="h2" align="center">
              You have Questions ?
            </Typography>

            <Typography
              variant="subtitle1"
              align="center"
              color="text.secondary"
            >
              Here are some frequently asked questions about our Platform from
              our loving customers. Should you have any other questions, feel
              free to reach us out.
            </Typography>
          </Container>

          <Container maxWidth="md" sx={{ pt: 2 }}>
            <FAQS />
          </Container>
        </Grid>
      </Container>
      {/* Footer */}
      <Paper elevation={6}>
        <Container maxWidth="lg">
          <Grid
            container
            alignItems="center"
            justifyContent="space-evenly"
            sx={{ pt: 5, mt: 10, pb: 5 }}
          >
            <Grid item xs={12}>
              <Typography
                variant="h6"
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                TrabanWaan
              </Typography>
            </Grid>
            <Grid item container alignItems="center" justifyContent={"center"}>
              <FacebookOutlinedIcon sx={{ m: 1 }} />
              <TwitterIcon sx={{ m: 1 }} />
              <YouTubeIcon sx={{ m: 1 }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                © Copyright 2022, TrabanWaan All Rights Reserved.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </>
  );
}
