import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FormLabel from "@mui/material/FormLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

import { useRef, useState } from "react";
import { Box, Button, Fab, Grid, Typography } from "@mui/material";
import { searchUser } from "../lib/auth";

function Filter(props) {
  const [open, setOpen] = useState(true);
  const searchValue = useRef(null);
  const [areaFilterValue, setAreaFilterValue] = useState("");
  const [ratingFilterValue, setRatingFilterValue] = useState("");
  const [serviceFilterValue, setServiceFilterValue] = useState([]);

  /*   console.log(areaFilterValue, "area value")
  console.log(ratingFilterValue, "rating value")
  console.log(serviceFilterValue, "service filters check"); */

  const handleAreaFilterChange = (event) => {
    setAreaFilterValue(event.target.value);
  };
  const handleRatingFilterChange = (event) => {
    setRatingFilterValue(event.target.value);
  };
  const handleServiceFilterChange = (event) => {
    const index = serviceFilterValue.indexOf(event.target.value); //find index of checked value
    if (index === -1) {
      //when checked value is not present add it
      setServiceFilterValue([...serviceFilterValue, event.target.value]);
    } else {
      setServiceFilterValue(
        serviceFilterValue.filter((service) => service !== event.target.value) //return only the current checked value
      );
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    /*     console.log(searchValue.current.value, "searcg value");
    console.log(serviceFilterValue, "service filters check");
    console.log(areaFilterValue, "area value");
    console.log(ratingFilterValue, "rating value"); */
    if (
      !searchValue.current.value &&
      !serviceFilterValue &&
      !areaFilterValue &&
      !ratingFilterValue
    ) {
      props.onSaveFilters([]);
      localStorage.removeItem("searchValue");
      return;
    }

    try {
      const result = await searchUser(
        searchValue.current.value,
        serviceFilterValue,
        areaFilterValue,
        ratingFilterValue
      );
      /* console.log(result, "result in filter.js component"); */
      localStorage.setItem("searchValue", JSON.stringify(result.searchResult));
      props.onSaveFilters(result.searchResult);
    } catch (error) {
      console.log(error, "filter try catch");
    }
  };
  const handleReset = () => {
    searchValue.current.value = "";
    setAreaFilterValue("");
    setRatingFilterValue("");
    setServiceFilterValue("");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Search for your worker</DialogTitle>
        <form onSubmit={submitHandler}>
          <DialogContent>
            <TextField
              fullWidth
              placeholder="Search..."
              name="search"
              inputRef={searchValue}
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Grid container sx={{ mt: 1 }}>
              <Grid item xs>
                <FormControl>
                  <FormLabel>Service</FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="Cleaning"
                          checked={serviceFilterValue.includes("Cleaning")}
                          onChange={handleServiceFilterChange}
                        />
                      }
                      label="Cleaning"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="Maintenance"
                          checked={serviceFilterValue.includes("Maintenance")}
                          onChange={handleServiceFilterChange}
                        />
                      }
                      label="Maintenance"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          value="Delivery"
                          checked={serviceFilterValue.includes("Delivery")}
                          onChange={handleServiceFilterChange}
                        />
                      }
                      label="Delivery"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>

              <Grid item xs>
                <FormControl>
                  <FormLabel>Area</FormLabel>
                  <RadioGroup
                    name="areaRadio"
                    onChange={handleAreaFilterChange}
                    value={areaFilterValue}
                  >
                    <FormControlLabel
                      value="Legazpi"
                      control={<Radio />}
                      label="Legazpi"
                    />
                    <FormControlLabel
                      value="Rawis"
                      control={<Radio />}
                      label="Rawis"
                    />
                    <FormControlLabel
                      value="Albay"
                      control={<Radio />}
                      label="Albay"
                    />
                    <FormControlLabel
                      value="Tabaco"
                      control={<Radio />}
                      label="Tabaco"
                    />
                    <FormControlLabel
                      value="Daraga"
                      control={<Radio />}
                      label="Daraga"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControl>
                  <FormLabel>Rating</FormLabel>
                  <RadioGroup
                    name="ratingRadio"
                    onChange={handleRatingFilterChange}
                    value={ratingFilterValue}
                  >
                    <FormControlLabel
                      value="5"
                      control={<Radio />}
                      label="5 Stars"
                    />
                    <FormControlLabel
                      value="4"
                      control={<Radio />}
                      label="4 Stars and Up"
                    />
                    <FormControlLabel
                      value="3"
                      control={<Radio />}
                      label="3 Stars and Up"
                    />
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="2 Stars and Up"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="1 Stars and Up"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <DialogContentText></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="contained" type="sumbit" onClick={handleClose}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Grid
        sx={{
          width: "100%",
          justifyContent: "center",
          position: "fixed",
          display: "flex",
          bottom: 20,
        }}
      >
        <Fab variant="extended" color="primary" onClick={handleClickOpen}>
          <SearchOutlinedIcon />
          Search and Filters
        </Fab>
      </Grid>
    </>
  );
}

export default Filter;
