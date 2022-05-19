import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Link as MUILink,
  Paper,
  Typography,
  Box,
  Grid,
  Container,
  Avatar,
  Button,
  Autocomplete,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { createUser } from "../lib/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignUpForm() {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailHelperText, setEmailHelperText] = useState("");
  const [passwordHelperText, setPasswordHelperText] = useState("");
  const [accountType, SetAccountType] = useState("worker");
  const [backdropLoader, setBackdropLoader] = useState(false);
  const router = useRouter();

  console.log(accountType, "accttype");
  const submitHandler = async (event) => {
    event.preventDefault();
    setBackdropLoader(true);
    setPasswordError(false);
    setEmailError(false);
    setEmailHelperText("");
    setPasswordHelperText("");

    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const email = data.get("email");
    const password = data.get("password");

    /*     console.log(password.includes(firstName),"fn",firstName)
    console.log(password.includes(lastName),"ln",LastName)
    console.log(password.includes(email),"pas",email) */

    /* console.log(!email.includes("@")); */
    if (!email.includes("@")) {
      setEmailError(true);
      return setEmailHelperText("Invalid entry");
    }
    if (
      password.includes(firstName) ||
      password.includes(lastName) ||
      password.includes(email) ||
      password.length < 8 ||
      password.length > 72
    ) {
      setPasswordError(true);
      return setPasswordHelperText("Invalid entry");
    }

    /*     console.log({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },"signupform"); */
    try {
      const result = await createUser(
        firstName,
        lastName,
        email,
        accountType,
        password
      );
      console.log(result);
      const signInResult = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
      });
      if (!result.error) {
        router.replace("/");
      }
      console.log(signInResult);
    } catch (error) {
      console.log(error, "signup try catch");
    }
    setBackdropLoader(false);
  };
  return (
    <>
      <Backdrop open={backdropLoader}>
        <CircularProgress />
      </Backdrop>
      {!backdropLoader && (
        <Container component="main" maxWidth="xs">
          <Paper>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                p: "10px 20px",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box component="form" onSubmit={submitHandler} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={emailError}
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      helperText={emailHelperText}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Autocomplete
                      id="disable-clearable"
                      disableClearable
                      onChange={(event, value) => SetAccountType(value)}
                      options={["client", "worker"]}
                      getOptionLabel={(option) => option}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Sign up as"
                          fullWidth
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={passwordError}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      helperText={passwordHelperText}
                    />
                  </Grid>
                  {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" passHref>
                      <MUILink underline="hover" variant="body2">
                        Already have an account? Log in
                      </MUILink>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        </Container>
      )}
    </>
  );
}
