import React from "react";

function EmailTemplate({ otp, username }: { otp: number; username: string }) {
  return (
    <div>
      <h1>Hi,{username}!</h1>
      <h3>
        It looks like you are trying to reset your password. As an additional
        security measure, you are requested to enter the OTP code (one-time
        password) provided in this email.
      </h3>
      <h4>
        If you did not request a password reset, please ignore this email. The
        OTP code is: {otp}
      </h4>
    </div>
  );
}

export default EmailTemplate;
