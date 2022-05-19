import { Button, Container, Fab, Grid } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputAdornment from "@mui/material/InputAdornment";
import { useRef, useState } from "react";

function FindTaskFilter(props) {
  const [open, setOpen] = useState(true);
  const searchValue = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  const handleReset = () => {
    searchValue.current.value = "";
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
        <DialogTitle>Search Task</DialogTitle>
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
          Search Task
        </Fab>
      </Grid>
    </>
  );
}

export default FindTaskFilter;
