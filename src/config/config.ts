// this may contain services configs or some env validations
export const config = {
    env:"development",
    mongoose:{
        url:"mongodb://127.0.0.1:27017/dawrat"
    },
    port:8080,
    jwt:{
        secret:"jwtSecret",
        accessExpirationMinutes:60,
        refreshExpirationDays:30
    }
}