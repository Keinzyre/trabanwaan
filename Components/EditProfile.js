import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Link as MUILink } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fireBaseStorage } from "../util/firebase";
import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { updateWorkerProfile, useUser } from "../lib/auth";
import { useSession } from "next-auth/react";

export default function EditProfile(props) {
  const { data: session, status } = useSession();
  const worker_id = props.userId;
  /* const { avatar } = props.data; */
  const { user, isLoading, isError, isValidating, mutate } = useUser(worker_id);
  /*     console.log(user, isLoading, isError, "useSWR hook"); */
  const [backdropLoader, setBackdropLoader] = useState(isLoading);
  const [profileImage, setProfileImage] = useState(null);
  const [serviceTags, setServiceTags] = useState(null);
  const [serviceArea, setServiceArea] = useState(null);
  useEffect(() => {
    setProfileImage(avatar);
    setServiceTags(service);
    setServiceArea(area);
    console.log("useeffect runs");
  }, [user]);

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
  /*   console.log(serviceTags, "service tags"); */
  const { avatar, introduction, service, startingCost, area, address } =
    user.userInfo.profile;
  /*   console.log(worker_id, avatar, introduction, service, startingCost, area,"editprofile propsdata"); */

  const submitHandler = async (event) => {
    event.preventDefault();
    setBackdropLoader(true);
    const dataform = new FormData(event.currentTarget);
    const introValue = dataform.get("introduction");
    const startingCostValue = dataform.get("startingCost");
    /*     setNewIntroduction(introValue);
    setNewStartingCost(startingCostValue); */

    try {
      const result = await updateWorkerProfile(
        worker_id,
        profileImage,
        introValue,
        serviceTags,
        startingCostValue,
        serviceArea
      );
      console.log(result, "profile updateuser result");
      mutate();
      setBackdropLoader(false);
    } catch (error) {
      console.log(error, "profile update try catch");
    }

    /*     console.log(
      newIntroduction,
      newStartingCost,
      serviceTags,
      serviceArea,
      "in submithandler data edit prof"
    ); */
    /* console.log(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET); */
  };
  /*   console.log(
    newIntroduction,
    newStartingCost,
    serviceTags,
    serviceArea,
    "outside submit data edit prof"
  ); */
  function uploadFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    console.log(file);
    console.log(file.type);
    console.log("onchange");

    if (file.type !== "image/png" && file.type !== "image/jpeg") {
      console.log("not png or jpeg");
    }

    const profileRef = ref(
      fireBaseStorage,
      `userProfile/userEmail/${file.name}`
    );
    const uploadTask = uploadBytesResumable(profileRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setProfileImage(downloadURL);
        });
      }
    );
  }

  return (
    <Grid container wrap="nowrap" spacing={1}>
      <Grid item xs={12}>
        <Grid item>
          <Grid item xs={12}>
            <Typography variant="h6">Avatar</Typography>
            <Typography variant="body2">
              Allowed Formats: JPEG, PNG. Max size: 3mb. Optimal dimensions:
              230x230
            </Typography>
            <Avatar
              alt="T"
              src={profileImage}
              variant="rounded"
              sx={{ width: 150, height: 150 }}
            />
            <Button
              variant="contained"
              component="label"
              size="large"
              sx={{ mt: 1 }}
              onChange={uploadFile}
            >
              Upload File
              <input type="file" accept="image/png, image/jpeg" hidden />
            </Button>
          </Grid>
        </Grid>

        <Divider variant="fullWidth" sx={{ margin: "30px 0" }} />
        {/* Form */}
        <Grid item component="form" onSubmit={submitHandler}>
          {session.user.accountType === "worker" && (
            <>
              <Box sx={{ mt: 3 }}>
                <Typography>Introduction Profile</Typography>
                <TextField
                  required
                  placeholder="Enter your introduction"
                  defaultValue={introduction}
                  name="introduction"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={4}
                  sx={{ pt: 1 }}
                />
              </Box>
              <Grid item sx={{ pt: 2 }}>
                <Typography>Service Tags</Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  limitTags={5}
                  onChange={(event, value) => setServiceTags(value)}
                  options={serviceTagsList.map((option) => option.title)}
                  value={serviceTags ?? []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      placeholder="Services"
                      sx={{ pt: 1 }}
                    />
                  )}
                />
              </Grid>
              <Grid item sx={{ pt: 2 }}>
                <Typography>Starting Cost</Typography>
                <TextField
                  fullWidth
                  name="startingCost"
                  defaultValue={startingCost}
                  placeholder="Enter your starting cost"
                  variant="outlined"
                  sx={{ pt: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₱</InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item sx={{ pt: 2 }}>
                <Typography>Service Area</Typography>
                <Autocomplete
                  multiple
                  freeSolo
                  limitTags={5}
                  onChange={(event, value) => setServiceArea(value)}
                  options={serviceAreaList.map((option) => option.title)}
                  value={serviceArea ?? []}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      placeholder="Service Area"
                      sx={{ pt: 1 }}
                    />
                  )}
                />
              </Grid>
            </>
          )}

          <Grid item sx={{ pt: 2 }}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const serviceTagsList = [
  { title: "Cleaning" },
  { title: "Maintenance" },
  { title: "Plumber" },
  { title: "Handyman" },
  { title: "Delivery" },
];

const serviceAreaList = [
  { title: "Albay" },
  { title: "Legazpi" },
  { title: "Camalig" },
  { title: "Tabaco" },
  { title: "Rawis" },
];
