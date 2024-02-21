const ArtworksManager = (conn) =>({
  list: async () => (await conn.get('/artworks/')).data,
  get: async (id) => (
    await conn.get(`/artworks/${id}/`)
  ).data,
  getRandom: async () => (
    await conn.get('/artworks/random/')
  ).data,
  addEmotion: async (id, emotion) => (
    await conn.post(`/artworks/${id}/emotions/`, { emotion })
  ).data,
});

export default ArtworksManager;
