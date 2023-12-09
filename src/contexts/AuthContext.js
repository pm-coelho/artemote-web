import React, { createContext, useContext} from 'react';

import artfeelzClient from '../services/artfeelzClient';
import config from '../config.json';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  // const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  let client = artfeelzClient({
    apiUrl: config.apiUrl,
  //  token: accessToken
  });

  // const login = ({access, refresh, user}) => {
  //   setAccessToken(access);
  //   setRefreshToken(refresh);
  //   setUser(user);
  //   localStorage.setItem('accessToken', access);
  //   localStorage.setItem('refreshToken', refresh);
  //   localStorage.setItem('user', JSON.stringify(user));
  // }

  // const logout = () => {
  //   localStorage.removeItem('accessToken');
  //   localStorage.removeItem('refreshToken');
  //   localStorage.removeItem('user');
  //   setAccessToken(null);
  //   setRefreshToken(null);
  //   setUser(null);
  // }

  return (
    <AuthContext.Provider value={{
      client,
      /* user, */
      /* accessToken, */
      /* refreshToken, */
      /* login, */
      /* logout, */
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
