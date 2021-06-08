import { RoleType } from "@rent/interfaces/enums/role.enum";

export interface UserSessionInterface {
    id: number;
    name: string;
    email: string;
    phones: number[];
    role: RoleType;
    area: number;
  }