const ArtworksManager = (conn) =>({
  list: async () => (await conn.get('/artworks/')).data,
  get: async (id) => (
    await conn.get(`/artworks/${id}/`)
  ).data,
});

export default ArtworksManager;
