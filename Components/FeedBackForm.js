import { useState, useRef } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { sendFeedBack } from "../lib/sendfeedback";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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

function FeedBackForm() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(4);
  const [hover, setHover] = useState(-1);
  const feedbackInputRef = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  async function submitHandler(event) {
    event.preventDefault();
    setLoading(true);
    const enteredfeedback = feedbackInputRef.current.value;
    const rating = value;
    const date = new Date().toISOString();

    if (enteredfeedback && rating) {
      console.log(enteredfeedback, value, date);
      const workerID = router.query._id;
      const author_id = session.user._id;
      const firstName = session.user.firstName;
      const lastName = session.user.lastName;
      try {
        const result = await sendFeedBack(
          workerID,
          author_id,
          firstName,
          lastName,
          enteredfeedback,
          rating,
          date
        );
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);

    /* setLoading(false); */
  }

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <form onSubmit={submitHandler}>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        <TextField
          required
          id="feedback"
          label="Feedback Details"
          fullWidth
          variant="outlined"
          multiline
          rows={4}
          placeholder="Does a wonderful job!"
          inputRef={feedbackInputRef}
          sx={{ marginTop: 2 }}
        />
        <LoadingButton
          type="submit"
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          Submit
        </LoadingButton>
      </form>
    </Container>
  );
}
export default FeedBackForm;
