
export interface ILoginResponse {
  token: string
  username: string
  rol: string
}

// Interfaz para la respuesta completa del backend
export interface IBackendLoginResponse {
  success: boolean
  message: string
  data: {
    accessToken: string
    userName: string
    role: string
  }
  errors: any[]
  statusCode: number
  timestamp: string
}
