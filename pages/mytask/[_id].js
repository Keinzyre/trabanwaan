import { Paper, Container, Typography } from "@mui/material";
import SvgIcon from "@mui/material/SvgIcon";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import MyTaskLayout from "../../Components/MyTaskLayout";
import { getUser } from "../../lib/auth";
import { getTask } from "../../lib/Task";
function MyTaskList(props) {
  const { data: session, status } = useSession();
  console.log(session, status, "session & status in mytask");
  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Paper sx={{ p: "40px 20px" }}>
        {props.taskData.taskInfo.length ? (
          props.taskData.taskInfo.map((item) => (
            <MyTaskLayout
              key={item._id}
              {...item}
              accountType={session.user.accountType}
            />
          ))
        ) : (
          <Typography variant="h6">You have no tasks.</Typography>
        )}
      </Paper>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });
  console.log(session, "serverside props acct");
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const protocol = context.req.headers["x-forwarded-proto"] || "http";
  const baseUrl = context.req
    ? `${protocol}://${context.req.headers.host}`
    : "";

  const worker_id = context.params._id;
  const taskData = await getTask(baseUrl, worker_id, session.user.accountType);
  console.log(taskData, "task data in mytask");
  return {
    props: {
      session,
      taskData,
    },
  };
}

export default MyTaskList;
