import {
  Paper,
  Container,
  Grid,
  Typography,
  Divider,
  Button,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { useState } from "react";
import { updateStatus } from "../lib/Task";

function MyTaskLayout(props) {
  const {
    _id,
    firstName,
    lastName,
    workerData,
    frequency,
    date,
    description,
    image,
    dateStart,
    dateEnd,
    timeStart,
    timeEnd,
    status,
    accountType,
  } = props;
  const [updatedStatus, setUpdatedStatus] = useState(status);
  const [backdropLoader, setBackdropLoader] = useState(false);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const taskAccept = async () => {
    setBackdropLoader(true);
    try {
      const result = await updateStatus(_id, "accepted");
      console.log(result);
      setUpdatedStatus("accepted");
    } catch (error) {
      console.log(error, "failed to update task status");
    }
    setBackdropLoader(false);
  };
  const taskDeny = async () => {
    setBackdropLoader(true);
    try {
      const result = await updateStatus(_id, "denied");
      console.log(result);
      setUpdatedStatus("denied");
    } catch (error) {
      console.log(error, "failed to update task status");
    }
    setBackdropLoader(false);
  };
  const taskCancel = async () => {
    setBackdropLoader(true);
    try {
      const result = await updateStatus(_id, "cancelled");
      console.log(result);
      setUpdatedStatus("cancelled");
    } catch (error) {
      console.log(error, "failed to update task status");
    }
    setBackdropLoader(false);
  };
  if (backdropLoader) {
    <Backdrop open>
      <CircularProgress />
    </Backdrop>;
  }
  return (
    <>
      <Grid container wrap="nowrap" spacing={1} direction="column">
        <Grid item>
          {accountType === "worker" && (
            <Typography variant="h6">
              Client Name: {firstName} {lastName}
            </Typography>
          )}
          {accountType === "client" && (
            <>
              <Typography variant="h6">
                Worker: {workerData.firstName} {workerData.lastName}
              </Typography>
              <Typography variant="h6">Email: {workerData.email}</Typography>
              <Typography variant="h6">
                Phone Number: {workerData.phoneNumber}
              </Typography>
            </>
          )}
        </Grid>
        <Grid item>
          <Typography variant="h6"> Frequency: {frequency}</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            Status: {updatedStatus ?? "pending"}
          </Typography>
        </Grid>
        {frequency === "one time" && (
          <Grid item>
            <Typography variant="h6">
              Date:{" "}
              {new Date(date).toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "medium",
              })}
            </Typography>
          </Grid>
        )}
        {frequency === "recurring" && (
          <>
            <Grid item>
              <Typography variant="h6">
                Date Start:{" "}
                {new Date(dateStart).toLocaleDateString(undefined, options)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Date End:{" "}
                {new Date(dateEnd).toLocaleDateString(undefined, options)}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Time Start: {new Date(timeStart).toLocaleTimeString()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">
                Time End: {new Date(timeEnd).toLocaleTimeString()}
              </Typography>
            </Grid>
          </>
        )}
        <Grid item>
          <Typography variant="h6"> Details: </Typography>
          <Typography variant="body1">
            {" "}
            {description ?? "No Details"}{" "}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6"> Image: </Typography>
          <Typography variant="body2"> {image ?? "No Image"} </Typography>
        </Grid>
        <Grid item>
          {accountType === "worker" && (
            <>
              <Button
                variant="contained"
                color="info"
                sx={{ mr: 3 }}
                onClick={taskAccept}
              >
                Accept
              </Button>
              <Button variant="contained" color="error" onClick={taskDeny}>
                Deny
              </Button>
            </>
          )}
          {accountType === "client" && (
            <Button
              variant="contained"
              color="info"
              sx={{ mr: 3 }}
              onClick={taskCancel}
            >
              Cancel
            </Button>
          )}
        </Grid>
      </Grid>
      <Divider variant="fullWidth" sx={{ margin: "20px 0" }} />
    </>
  );
}

export default MyTaskLayout;
