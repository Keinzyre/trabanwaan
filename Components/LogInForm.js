import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import {
  Backdrop,
  CircularProgress,
  Link as MUILink,
  Paper,
} from "@mui/material";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginForm() {
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [backdropLoader, setBackdropLoader] = useState(false);
  const router = useRouter();
  /* const [emailHelperText, setEmailHelperText] = useState(""); */
  const [passwordHelperText, setPasswordHelperText] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBackdropLoader(true);
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });
    console.log(result);
    if (result.error) {
      setEmailError(true);
      /* setEmailHelperText("Invalid entry"); */
      
      setPasswordError(true);
      setPasswordHelperText("Invalid email or password");
    }
    setBackdropLoader(false);
    if (!result.error) {
      router.replace("/");
    }

    /*     console.log({
      email: email,
      password: password,
    }); */
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
                Log in
              </Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                  inputProps={{ bgcolor: "#8C9398" }}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailError}
                  autoFocus
                  /* helperText={emailHelperText} */
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  error={passwordError}
                  helperText={passwordHelperText}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" passHref>
                      <MUILink underline="hover" variant="body2">
                        Forgot password?
                      </MUILink>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signup" passHref>
                      <MUILink underline="hover" variant="body2">
                        {"Don't have an account? Sign Up"}
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
