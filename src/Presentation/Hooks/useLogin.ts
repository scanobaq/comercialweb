import { useState } from 'react';
import type { ILogin } from '../../Domain/Interfaces/ILogin';
import type { ILoginResponse } from '../../Domain/Interfaces/ILoginResponse';
import { loginService } from '../../Infrastructure/Services/LoginService';
import { loginUseCase } from '../../Application/UseCase/Login/loginUseCase';

export const useLogin = () => {
  const [loginResponse, setLoginResponse] = useState<ILoginResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (loginData: ILogin) => {
    setLoading(true);
    try {
      const res = await loginUseCase(loginData, loginService);
      console.log('Respuesta completa del backend:', res);
      const responseData = {
        token: res.data.accessToken,
        username: res.data.userName,
        rol: res.data.role
      };
      
      setLoginResponse(responseData);
      return responseData;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, loading, error, loginResponse };
};
