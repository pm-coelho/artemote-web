const ArtistsManager = (conn) =>({
  list: async () => (await conn.get('/artists/')).data,
  get: async (id) => (
    await conn.get(`/artists/${id}/`)
  ).data,
});

export default ArtistsManager;
