import { Button, Grid, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useRef, useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PhotoOutlinedIcon from "@mui/icons-material/PhotoOutlined";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";
import { createTask } from "../lib/Task";
import { useSession } from "next-auth/react";

const steps = ["Select Schedule", "Write your message", "Confirm your address"];

function BookingLayout(props) {
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [valueDateTime, setValueDateTime] = useState(null);
  const [frequency, setFrequency] = useState("one time");
  const [dateStart, setDateStart] = useState(null);
  const [dateEnd, setDateEnd] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeEnd, setTimeEnd] = useState(null);
  const [description, setDescription] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState(null);
  const descriptionRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const addressRef = useRef(null);
  const router = useRouter();

  const { data: session, status } = useSession();
  const handleNext = async () => {
    if (activeStep <= 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    if (activeStep === 1) {
      setDescription(descriptionRef.current.value);
    }

    if (activeStep === 2) {
      setPhoneNumber(phoneNumberRef.current.value);
      setAddress(addressRef.current.value);
      if (frequency === "one time") {
        console.log(
          valueDateTime,
          frequency,
          description,
          phoneNumber,
          address,
          "onclickfinish one time"
        );
      }
      if (frequency === "recurring") {
        console.log(
          frequency,
          dateStart,
          dateEnd,
          timeStart,
          timeEnd,
          description,
          phoneNumber,
          address,
          "onclickfinish recurring"
        );
      }
      const clientID = session.user._id;
      const firstName = session.user.firstName;
      const lastName = session.user.lastName;
      const workerID = router.query._id;
      const workerData = {
        firstName: props.workerFirstName,
        lastName: props.workerLastName,
        email: props.email,
        phoneNumber: props.phoneNumber,
      };
      console.log(
        workerData,
        "workerData",
        props.workerFirstName,
        "workerdata fn"
      );
      try {
        const result = await createTask(
          clientID,
          workerID,
          firstName,
          lastName,
          workerData,
          frequency,
          valueDateTime,
          dateStart,
          dateEnd,
          timeStart,
          timeEnd,
          description
        );
        console.log(result);
      } catch (error) {
        console.log(error, "create task try catch");
      }
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleChange = (event) => {
    setFrequency(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Button variant="contained" color="success" onClick={handleClickOpen}>
        Request Service
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Grid container justifyContent="flex-end">
          <Button onClick={handleClose} size="small">
            <CloseOutlinedIcon fontSize="small" />
          </Button>
        </Grid>

        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <DialogContent dividers sx={{ height: "50vh" }}>
          <Grid container direction="column" alignItems="center" rowSpacing={1}>
            {activeStep === steps.length && (
              <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </>
            )}
            {activeStep === 0 && (
              <>
                <Grid item>
                  <FormControl>
                    <Typography>Frequency</Typography>
                    <RadioGroup value={frequency} onChange={handleChange}>
                      <FormControlLabel
                        value="one time"
                        control={<Radio />}
                        label="One Time?"
                      />
                      <FormControlLabel
                        value="recurring"
                        control={<Radio />}
                        label="Recurring"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {frequency === "one time" && (
                  <Grid item>
                    <DateTimePicker
                      renderInput={(props) => <TextField {...props} />}
                      label="DateTimePicker"
                      value={valueDateTime}
                      minDateTime={new Date()}
                      onChange={(newValue) => {
                        setValueDateTime(newValue);
                      }}
                    />
                  </Grid>
                )}
                {frequency === "recurring" && (
                  <>
                    <Grid item>
                      <DatePicker
                        label="Date Start"
                        value={dateStart}
                        minDate={new Date()}
                        onChange={(newValue) => {
                          setDateStart(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item>
                      <DatePicker
                        label="Date end"
                        value={dateEnd}
                        minDate={dateStart}
                        onChange={(newValue) => {
                          setDateEnd(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="Time Start"
                        value={timeStart}
                        onChange={(newValue) => {
                          setTimeStart(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                    <Grid item>
                      <TimePicker
                        label="Time End"
                        value={timeEnd}
                        onChange={(newValue) => {
                          setTimeEnd(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Grid>
                  </>
                )}
              </>
            )}
            {activeStep === 1 && (
              <>
                <Typography sx={{ pb: 1 }}>
                  Additional details to help workers provide right service
                </Typography>
                <TextField
                  label="Describe the task in more detail"
                  multiline
                  fullWidth
                  minRows={4}
                  defaultValue={description}
                  inputRef={descriptionRef}
                />
                {/*                 <img
                  src="https://firebasestorage.googleapis.com/v0/b/my-app-adeeb.appspot.com/o/userProfile%2Fshalltear.jpg?alt=media&token=3541597f-5ee1-4d47-9d1f-b7b9bb5f17e7"
                  loading="lazy"
                /> */}
                <Button
                  variant="outlined"
                  component="label"
                  sx={{ mt: 1 }}
                  /* onChange={uploadFile} */
                >
                  Add image
                  <input type="file" accept="image/png, image/jpeg" hidden />
                </Button>
              </>
            )}
            {activeStep === 2 && (
              <>
                <Typography sx={{ pb: 1 }}>Contact</Typography>
                <TextField
                  label="Phone Number"
                  fullWidth
                  defaultValue={phoneNumber}
                  inputRef={phoneNumberRef}
                />
                <Typography sx={{ pt: 1 }}>Address</Typography>
                <TextField
                  label="Street Name, Building, House No."
                  fullWidth
                  defaultValue={address}
                  inputRef={addressRef}
                />
              </>
            )}
          </Grid>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            startIcon={<KeyboardArrowLeft />}
          >
            Back
          </Button>
          <Button onClick={handleNext} endIcon={<KeyboardArrowRight />}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

export default BookingLayout;
