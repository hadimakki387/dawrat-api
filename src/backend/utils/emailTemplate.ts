export const emailTemplate = (otp: number, username:string) => {
    return `Hi, ${username}!

It looks like you are trying to reset your password. As an additional security measure, you are requested to enter the OTP code (one-time password) provided in this email.

If you did not request a password reset, please ignore this email.

The OTP code is: ${otp}
  `
}