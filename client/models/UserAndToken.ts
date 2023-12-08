import { User } from "./User";

export interface UserAndToken {
    user: User;
    jwtToken: string;
}
