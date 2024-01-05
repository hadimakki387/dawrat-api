export interface OTPInterface {
    email: string;
    otp: number;
    createdOn: Date;
    expireAt: Date;
}