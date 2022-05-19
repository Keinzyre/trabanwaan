import Container from "@mui/material/Container";
import AccountSetttingsLayout from "../../Components/AccountSetttingsLayout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import EditProfile from "../../Components/EditProfile";
import { getSession, useSession } from "next-auth/react";
import { getUser } from "../../lib/auth";
function Account(props) {
  const [selectedTab, setSelectedTab] = useState(0);
  /* const { data: session, status } = useSession(); */

  /* console.log(session, "session in acctpages"); */
  const userInfo = props.userInfo;
  /*   useEffect(() => {
    if (!userInfo) {
      getUserInfo();
    }
  }, []);

  const getUserInfo = async () => {
    const userId = session.user._id;
    const userData = await getUser(userId);
    setUserInfo(userData);
  }; */

  const tabHandler = (event, tabValue) => {
    setSelectedTab(tabValue);
  };

  return (
    <Container maxWidth="md" sx={{ p: 2 }}>
      <Paper sx={{ p: "0px 20px 40px" }}>
        <Tabs
          value={selectedTab}
          onChange={tabHandler}
          centered
          sx={{ pb: "10px" }}
        >
          <Tab label="Account Settings" />
          <Tab label="Edit Profile" />
        </Tabs>
        {selectedTab === 0 && (
          <AccountSetttingsLayout userId={userInfo._id} />
        )}
        {selectedTab === 1 && <EditProfile userId={userInfo._id} />}
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
  const userId = session.user._id;
  const userData = await getUser(baseUrl, userId);

  return {
    props: {
      session,
      userInfo: userData.userInfo,
    },
  };
}

export default Account;
