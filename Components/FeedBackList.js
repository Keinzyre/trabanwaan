import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Grid from "@mui/material/Grid";
function FeedBackList(props) {
  return (
    <>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar alt="Remy Sharp">H</Avatar>
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <Grid container wrap="nowrap">
            <Grid item xs={10}>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                {props.firstName ?? "firstName"} {props.lastName ?? "lastName"}
              </h4>
              <Rating
                sx={{ align: "right" }}
                precision={0.5}
                size="small"
                name="read-only"
                value={props.rating}
                readOnly
              />
            </Grid>
            <Grid item xs={2}>
              <p style={{ margin: 0, color: "gray" }}>
                {new Date(props.date).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </Grid>
          </Grid>
          <p>{props.comment}</p>
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
    </>
  );
}
export default FeedBackList;
