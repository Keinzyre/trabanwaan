import Container from "@mui/material/Container";
import ProfileLayout from "../../Components/ProfileLayout";
import FeedBackList from "../../Components/FeedBackList";
import { getFeedBack } from "../../lib/getfeedback";
import { Paper } from "@mui/material";
import { getUser } from "../../lib/auth";
import FeedBackForm from "../../Components/FeedBackForm";
import { useSession } from "next-auth/react";

function Profile(props) {
  const { data: session, status } = useSession();
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Paper sx={{ p: "40px 20px" }}>
        <ProfileLayout workerProfile={props.workerProfile} />
        {props.workerProfile.feedback &&
          props.workerProfile.feedback.map((item, i) => (
            <FeedBackList key={i} {...item} />
          ))}
        {session && session.user.accountType === "client" && <FeedBackForm />}
      </Paper>
    </Container>
  );
}
export async function getServerSideProps({ req, params }) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = req ? `${protocol}://${req.headers.host}` : "";
  const worker_id = params._id;
  const userData = await getUser(baseUrl, worker_id);
  const feedbackData = await getFeedBack(baseUrl);
  return {
    props: {
      workerProfile: userData.userInfo,
      feedback: feedbackData.feedback,
    },
  };
}

export default Profile;
