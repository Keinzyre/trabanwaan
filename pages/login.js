import { useSession } from "next-auth/react";
import LogInForm from "../Components/LogInForm";

function Signup(props) {
/*   const { data: session, status } = useSession();
  if(session){
    window.location.href='/'
  }
  if (status === "loading") {
    return <p>Loading</p>;
  } */
  return <LogInForm />;
}

export default Signup;
