import React from "react";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();

  return <div>Authenticate User</div>;
};

export default AuthCallbackPage;
