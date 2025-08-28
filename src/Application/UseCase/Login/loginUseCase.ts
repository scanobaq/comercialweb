import type { ILogin } from "../../../Domain/Interfaces/ILogin";
import type { ILoginService } from "../../../Infrastructure/Services/ILoginService";

export const loginUseCase = async (request: ILogin, loginService: ILoginService) => {
  const data = await loginService.login(request);
  return data;
};
