import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';

import type { ILogin } from '../../../Domain/Interfaces/ILogin';
import { useLogin } from '../../Hooks/useLogin';
import { useUserAuthStore } from '../../../Infrastructure/Store/userAuthStore';

// Schema de validación con Zod
const loginSchema = z.object({
  email: z.string().min(1, 'El email es requerido').email('Ingresa un email válido'),
  password: z.string().min(1, 'La contraseña es requerida').min(6, 'La contraseña debe tener al menos 6 caracteres'),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones'
  })
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onLoginSuccess?: (data: ILogin) => void;
  onLoginError?: (error: string) => void;
}

export const Login: React.FC<LoginFormProps> = ({ onLoginSuccess, onLoginError }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading } = useLogin();
  const { setUser } = useUserAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange'
  });

  const onSubmit = async (loginData: LoginFormData) => {
    try {
      const loginResponse = await loginUser(loginData);
      
      if (loginResponse) {
        setUser({
          token: loginResponse.token,
          username: loginResponse.username,
          rol: loginResponse.rol
        });
        
        localStorage.setItem('userProfile', JSON.stringify(loginResponse))
        onLoginSuccess?.(loginData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError('root', {
        type: 'manual',
        message: errorMessage
      });
      onLoginError?.(errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3">
        {/* Logo simple tipo "OL" */}
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-black rounded-md px-2 py-1 text-sm leading-none shadow">
            OL
          </div>
          <span className="text-gray-700 text-xs">Open&nbsp;Life</span>
        </div>

        <span className="text-xs text-gray-700 bg-gray-100 border border-gray-200 rounded-full px-3 py-1">
          Beneficios por renovar
        </span>
      </div>

      {/* Card centrada */}
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8"
        >
          <h1 className="text-center font-semibold text-gray-800">
            Debes iniciar sesión para acceder a la plataforma
          </h1>
          <p className="mt-1 text-center text-xs text-gray-500">
            Digita tu documento de identidad del propietario o representante legal y tu contraseña
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                autoComplete="email"
                className={`w-full rounded-lg border px-3 py-2 outline-none focus:border-fuchsia-600 focus:ring-2 focus:ring-fuchsia-200 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                {...register('password')}
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                autoComplete="current-password"
                className={`w-full rounded-lg border px-3 py-2 pr-10 outline-none focus:border-fuchsia-600 focus:ring-2 focus:ring-fuchsia-200 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff className="h-5 w-5" /> : <FiEye className="h-5 w-5" />}
              </button>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600 select-none">
                <input 
                  {...register('terms')}
                  id="terms" 
                  name="terms" 
                  type="checkbox" 
                  className={`rounded border-gray-300 ${
                    errors.terms ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
                Acepto términos y condiciones
              </label>
              {errors.terms && (
                <p className="mt-1 text-sm text-red-600">{errors.terms.message}</p>
              )}
            </div>
          </div>

          {/* Error Message */}
          {errors.root && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600">{errors.root.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="mt-6 w-full rounded-lg bg-fuchsia-600 text-white font-semibold py-2.5 hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting || loading ? (
              <div className="flex items-center justify-center">
                <FiLoader className="animate-spin h-5 w-5 mr-2" />
                Iniciando sesión...
              </div>
            ) : (
              'Iniciar sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
