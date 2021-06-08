import { IsDefined } from "class-validator";

export class UserLoginDTO {
    @IsDefined()
    password: string;
    @IsDefined()
    email: string;
}