import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PermPhoneMsgOutlinedIcon from "@mui/icons-material/PermPhoneMsgOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { useState } from "react";
import BookingLayout from "./BookingLayout";
import DialogTitle from "@mui/material/DialogTitle";

const labels = {
  0: "N/A",
  0.5: "Bad",
  1: "Poor",
  1.5: "Poor+",
  2: "Fair",
  2.5: "Fair+",
  3: "Good",
  3.5: "Good+",
  4: "Great",
  4.5: "Excellent",
  5: "Excellent+",
};

export default function ProfileLayout(props) {
  const [open, setOpen] = useState(false);

  const {
    avatar,
    introduction,
    service,
    startingCost,
    area,
    averageRating,
    totalRating,
  } = props.workerProfile.profile;
  const { firstName, lastName, email, phoneNumber } = props.workerProfile;

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar
            variant="rounded"
            alt="worker"
            src={avatar}
            sx={{ width: 100, height: 100 }}
          />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography variant="h6">
            {firstName} {lastName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "green",
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontWeight: "bold",
              }}
            >
              {labels[Math.floor(averageRating * 2) / 2]} {averageRating}
            </Typography>
            <Rating
              precision={0.5}
              size="small"
              name="read-only"
              value={averageRating}
              readOnly
            />
            <Typography variant="caption" sx={{ color: "gray" }}>
              {totalRating}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ShareOutlinedIcon />}
            sx={{ m: 1 }}
          >
            Copy Share Link
          </Button>
        </Grid>
      </Grid>
      <Grid container sx={{ pt: 1 }}>
        <Typography variant="h6">Introduction:</Typography>
        <Typography variant="body1">{introduction}</Typography>
      </Grid>
      <Grid container sx={{ pt: 4 }}>
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Overview
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
            }}
          >
            <LocalOfferOutlinedIcon sx={{ minWidth: "30px" }} />
            <Typography variant="body2">
              Starting Cost: ₱{startingCost}
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
            }}
          >
            <FactCheckOutlinedIcon sx={{ minWidth: "30px" }} />
            <Typography variant="body2">Hired : 15 times</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
            }}
          >
            <LocationOnOutlinedIcon sx={{ minWidth: "30px" }} />
            <Typography variant="body2">
              Serves: {area && area.join(", ")}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ height: "100%" }}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
            }}
          >
            Contact
          </Typography>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
            }}
          >
            <EmailOutlinedIcon sx={{ minWidth: "30px" }} />
            <Typography variant="body2">{email}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
            }}
          >
            <PermPhoneMsgOutlinedIcon sx={{ minWidth: "30px" }} />
            <Typography variant="body2">{phoneNumber}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container sx={{ pt: 1 }}>
        <BookingLayout
          workerFirstName={firstName}
          workerLastName={lastName}
          email={email}
          phoneNumber={phoneNumber}
        />
      </Grid>
      <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
      <Grid container>
        <Typography variant="h6" sx={{ width: "100%", pb: 1 }}>
          Services:
        </Typography>
        <Grid container spacing={1}>
          {service &&
            service.map((serviceList) => (
              <Grid item key={serviceList}>
                <Chip label={serviceList} />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid container sx={{ mt: "20px" }}>
        <Button variant="contained" onClick={handleClickOpen}>
          View Featured Projects
        </Button>
      </Grid>
      <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
      <Grid container>
        <Typography variant="h6" sx={{ width: "100%", pb: 1 }}>
          Reviews:
        </Typography>
      </Grid>
      {/* dialogue */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Featured Projects</DialogTitle>
        <DialogContent>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {itemData &&
              itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
          </ImageList>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const itemData = [
  {
    img: "https://images.pexels.com/photos/6622889/pexels-photo-6622889.jpeg",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];
