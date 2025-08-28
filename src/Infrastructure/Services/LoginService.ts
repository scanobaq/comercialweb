import type { ILogin } from '../../Domain/Interfaces/ILogin';
import type { IBackendLoginResponse } from '../../Domain/Interfaces/ILoginResponse';
import { httpClient } from '../Api/httpClient';

const ENDPOINT = '/Auth';

export const loginService = {
  async login(login: ILogin): Promise<IBackendLoginResponse> {
    const { data } = await httpClient.post(`${ENDPOINT}/login`, login);
    return data;
  }
};
