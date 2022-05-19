import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import { updateWorkerAccount, useUser } from "../lib/auth";

export default function AccountSetttingsLayout(props) {
  const worker_id = props.userId;
  const { user, isLoading, isError, isValidating, mutate } = useUser(worker_id);

  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [changePasswordError, setChangePasswordError] = useState(false);
  const [changePasswordHelperText, setChangePasswordHelperText] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState("");
  const [backdropLoader, setBackdropLoader] = useState(isLoading);
/*   console.log(backdropLoader, "backdrop loader", isLoading, "isloading"); */

  useEffect(() => {
    if (!isLoading) {
      setBackdropLoader(false);
      console.log("useeffect loader false");
    } else {
      setBackdropLoader(true);
      console.log("useeffect loader true");
    }
  }, [isLoading]);
  if (backdropLoader) {
    return (
      <Backdrop open>
        <CircularProgress />
      </Backdrop>
    );
  }
  if (isError) {
    return <p>failed to load</p>;
  }
  /*   console.log(user.userInfo); */
  const { firstName, lastName, email, phoneNumber } = user.userInfo;

  /* console.log(props.data, "props in acctset"); */
  const submitHandler = async (event) => {
    event.preventDefault();
    setBackdropLoader(true);
    setChangePasswordError(false);
    setEmailError(false);
    setEmailHelperText("");
    setChangePasswordHelperText("");

    const data = new FormData(event.currentTarget);
    const changeFirstName = data.get("firstName");
    const changeLastName = data.get("lastName");
    const changeEmail = data.get("email");
    const changePhoneNumber = data.get("phoneNumber");
    const changePassword = data.get("changePassword");
    const confirmPassword = data.get("confirmCurrentPassword");

    /*     console.log(changePassword.includes(firstName),"fn",firstName)
    console.log(changePassword.includes(lastName),"ln",lastName)
    console.log(changePassword.includes(email),"pas",email)
    console.log(changePassword.includes(phoneNumber),"phone",phoneNumber)
    console.log(changePassword, "password") */
    /* console.log(!email.includes("@")); */
    if (!changeEmail.includes("@")) {
      setEmailError(true);
      return setEmailHelperText("Invalid entry");
    }
    if (changePassword) {
      //check changepass has value
      /* console.log(changePassword,"check if exist pass") */
      if (
        changePassword.includes(changeFirstName) ||
        changePassword.includes(changeLastName) ||
        changePassword.includes(changeEmail) ||
        changePassword.length < 8 ||
        changePassword.length > 72
      ) {
        setChangePasswordError(true);
        return setChangePasswordHelperText("Invalid entry");
      }
    }

    try {
      const result = await updateWorkerAccount(
        worker_id,
        changeFirstName,
        changeLastName,
        changeEmail,
        changePhoneNumber,
        changePassword,
        confirmPassword
      );

      console.log(result, "account updateuser result");
      mutate();
      setBackdropLoader(false);
    } catch (error) {
      console.log(error, "update try catch");
      setConfirmPasswordError(true);
      return setConfirmPasswordHelperText("Invalid entry");
    }
  };
  return (
    <Grid container wrap="nowrap" spacing={1}>
      <Grid item>
        <Grid item xs={12}>
          <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  key="dummyfirstName"
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Change First Name"
                  defaultValue={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  key="dummylastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Change Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  defaultValue={lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={emailError}
                  helperText={emailHelperText}
                  key="dummy@gmail.com"
                  required
                  fullWidth
                  id="email"
                  label="Change Email Address"
                  name="email"
                  autoComplete="email"
                  defaultValue={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  /* error={emailError}
                  helperText={emailHelperText} */
                  fullWidth
                  label="Phone Number"
                  id="phoneNumber"
                  name="phoneNumber"
                  defaultValue={phoneNumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={changePasswordError}
                  helperText={changePasswordHelperText}
                  fullWidth
                  name="changePassword"
                  label="Change Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12} sx={{ color: "gray" }}>
                <Typography component={"span"} variant="body2">
                  Your Password must:
                  <ul>
                    <li>be 8 to 72 characters long</li>
                    <li>not contain your name or email</li>
                    <li>not be commonly used or easily guessed</li>
                  </ul>
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  error={confirmPasswordError}
                  helperText={confirmPasswordHelperText}
                  required
                  fullWidth
                  name="confirmCurrentPassword"
                  label="Confirm Current Password"
                  type="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
          <Grid item>
            <Typography variant="h6" color={"red"}>
              Delete Account
            </Typography>
            <Typography variant="body2">
              Warning! This will permanently delete all your account data. When
              you delete your account, you will lose access to all of your
              projects, profile information, and any reviews you've received on
              Trabanwaan.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="error"
              sx={{ mt: 1 }}
            >
              Delete Account
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
