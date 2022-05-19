import FeedBackForm from "../Components/feedbackform";
import Container from "@mui/material/Container";
import FeedBackList from "../Components/FeedBackList";
import Paper from "@mui/material/Paper";
import { getFeedBack } from "../lib/getfeedback";

function FeedBack(props) {
  return (
    <>
      <Container maxWidth="md" sx={{ p: 2 }}>
        <Paper elevation={4} sx={{ p: "40px 20px" }}>
          {props.feedback.map((item) => (
            <FeedBackList
              key={item._id}
              rating={item.rating}
              text={item.feedback}
              date={item.date}
            />
          ))}
        </Paper>
      </Container>
      <FeedBackForm />
    </>
  );
}
export async function getServerSideProps({ req }) {
  const protocol = req.headers['x-forwarded-proto'] || 'http'
  const baseUrl = req ? `${protocol}://${req.headers.host}` : ''
  const data = await getFeedBack(baseUrl);
  return {
    props: {
      feedback: data.feedback,
    },
  };
}

export default FeedBack;
