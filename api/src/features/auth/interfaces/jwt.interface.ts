import { JwtPayload } from "jsonwebtoken";

export interface ISessionData extends JwtPayload {
  username: string;
  id: string;
}
