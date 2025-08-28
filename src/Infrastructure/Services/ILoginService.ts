import type { ILogin } from "../../Domain/Interfaces/ILogin";
import type { IBackendLoginResponse } from "../../Domain/Interfaces/ILoginResponse";

export interface ILoginService {
  login(login: ILogin): Promise<IBackendLoginResponse>;
}
