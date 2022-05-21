import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import Link from "next/link";
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

function ExploreLayout(props) {
  const searchList = props;
  const { _id, firstName, lastName, profile } = props;
  console.log(searchList, "searchlist props in explore layout");
  console.log();

  return (
    <>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar
            variant="rounded"
            alt="Remy Sharp"
            src={profile.avatar}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item xs={12} container columns={{ xs: 2, sm: 8, md: 12 }}>
          <Grid
            item
            xs={2}
            sm={4}
            md={6}
            container
            wrap="nowrap"
            direction="column"
          >
            <Grid item>
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
                  {labels[Math.floor(profile.averageRating * 2) / 2]}
                  {profile.averageRating}
                </Typography>
                <Rating
                  precision={0.5}
                  size="small"
                  name="read-only"
                  value={profile.averageRating}
                  readOnly
                />
                <Typography variant="caption" sx={{ color: "gray" }}>
                  {profile.RatingCount}
                </Typography>
              </Box>
              <Box
                item
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <LocationOnOutlinedIcon />
                <Typography variant="body2">
                  Serves: {profile.area && profile.area.join(", ")}
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {profile.service &&
                  profile.service.map((serviceList) => (
                    <Grid item key={serviceList}>
                      <Chip label={serviceList} />
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={2}
            sm={4}
            md={6}
            direction="column"
            justifyContent="space-between"
            alignItems={{ sm: "center", md: "flex-end" }}
          >
            <Grid item>
              <Typography variant="subtitle1">
                Starting Cost: ₱{profile.startingCost}
              </Typography>
            </Grid>
            <Grid item>
              <Link href={"/profile/" + _id} passHref>
                <Button variant="contained">View Profile</Button>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
    </>
  );
}

export default ExploreLayout;
