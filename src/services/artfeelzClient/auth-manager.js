const authManager = (conn) =>({
  getToken: async (username, password) => (await conn.post(
    "/auth/token",
    {username, password}
  )).data,
  refreshToken: async (refreshToken) => (await conn.post(
    "/auth/token/refresh",
    {refresh: refreshToken}
  )).data,
  getMe: async (accessToken) => {
    if (accessToken) {
      conn.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    }
    return (await conn.get("/auth/me")).data
  }
});

export default authManager;
