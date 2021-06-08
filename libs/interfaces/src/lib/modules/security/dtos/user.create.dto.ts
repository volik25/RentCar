import { IsDefined } from "class-validator";

export class CreateUserDTO {
    @IsDefined()
    password: string;
}