import jwt_decode from 'jwt-decode'; // Asegúrate de tener jwt-decode instalado
import Cookies from 'js-cookie';

// Función para verificar si el usuario está autenticado y obtener el userId
export function obtenerUserIdSiAutenticado() {
  // Obtén el JWT de las cookies

  return { estaAutenticado: true, userId: 9 }
  // const token = Cookies.get('auth_token');
  
  // if (!token) {
  //   return { estaAutenticado: false, userId: null }; // Retorna false y null si el token no existe
  // }

  // try {
  //   // Decodifica el token para obtener el payload
  //   const decoded = jwt_decode(token);
  //   const currentTime = Date.now() / 1000; // Tiempo actual en segundos

  //   // Verifica si el token ha expirado
  //   if (decoded.exp < currentTime) {
  //     console.log('Token expirado');
  //     return { estaAutenticado: false, userId: null }; // Retorna false y null si el token ha expirado
  //   }

  //   // Retorna true y el userId si el token es válido y no ha expirado
  //   return { estaAutenticado: true, userId: decoded.userId }; // Asegúrate de que el payload contiene un campo userId
  // } catch (error) {
  //   console.error('Error decodificando el token:', error);
  //   return { estaAutenticado: false, userId: null }; // Retorna false y null si hay un error al decodificar el token
  // }
}

/* import jwt_decode from 'jwt-decode'; // Asegúrate de tener jwt-decode instalado
import Cookies from 'js-cookie';

// Función para verificar si el usuario está autenticado y obtener datos adicionales del payload
export function obtenerDatosUsuarioSiAutenticado() {
  // Obtén el JWT de las cookies
  const token = Cookies.get('auth_token');
  
  if (!token) {
    return { estaAutenticado: false, userId: null, username: null, email: null }; // Retorna false y nulls si el token no existe
  }

  try {
    // Decodifica el token para obtener el payload
    const decoded = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Tiempo actual en segundos

    // Verifica si el token ha expirado
    if (decoded.exp < currentTime) {
      console.log('Token expirado');
      return { estaAutenticado: false, userId: null, username: null, email: null }; // Retorna false y nulls si el token ha expirado
    }

    // Retorna true y los datos del usuario si el token es válido y no ha expirado
    return { 
      estaAutenticado: true, 
      userId: decoded.userId, // Asegúrate de que el payload contiene un campo userId
      username: decoded.username, // Asegúrate de que el payload contiene un campo username
      email: decoded.email // Asegúrate de que el payload contiene un campo email
    };
  } catch (error) {
    console.error('Error decodificando el token:', error);
    return { estaAutenticado: false, userId: null, username: null, email: null }; // Retorna false y nulls si hay un error al decodificar el token
  }
} */