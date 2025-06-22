// import { onAuthenticateUser } from "@/actions/user";
// import { redirect } from "next/navigation";

// const AuthCallbackPage = async () => {
//   const auth = await onAuthenticateUser();

//   if (auth.status === 200 || auth.status === 201) {
//     redirect("/dashboard");
//   } else if (
//     auth.status === 403 ||
//     auth.status === 400 ||
//     auth.status === 500
//   ) {
//     redirect("/sign-in");
//   }

// };

// export default AuthCallbackPage;

import { onAuthenticateUser } from "@/actions/user";

export default async function AuthCallbackPage() {
  try {
    const auth = await onAuthenticateUser();
    console.log("Auth callback result:", auth);
    return Response.json({
      message: auth.status === 200 || auth.status === 201 ? "Success" : "Authentication failed",
      auth,
    });
  } catch (error) {
    console.error("Callback error:", error);
    return Response.json({ message: "Callback error", error: String(error) });
  }
}