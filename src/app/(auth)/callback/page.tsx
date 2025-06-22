import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  console.log("Auth callback result:", auth , auth.status , auth.error , auth.user);

  if (auth.status === 200 || auth.status === 201) {
    console.log("Callback: Authentication successful, redirecting to dashboard...");
    redirect("/dashboard");
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    console.log("Callback: Authentication failed, redirecting to sign-in...");
    redirect("/sign-in");
  }
  
  // This should never be reached due to redirects above
  console.log("Callback: No redirect triggered - this is unexpected!");
  return <div>Processing...</div>;
};

export default AuthCallbackPage;