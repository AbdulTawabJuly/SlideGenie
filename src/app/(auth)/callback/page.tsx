import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    // redirect("/dashboard");
    return <div>Redirecting to dashboard</div>;
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    // redirect("/sign-in");
    return <div>Redirecting to sign-in</div>;
  }
};

export default AuthCallbackPage;
