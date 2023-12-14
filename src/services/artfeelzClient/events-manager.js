const EventsManager = (conn) =>({
  list: async () => (await conn.get('/events/')).data,
  get: async (id) => (
    await conn.get(`/events/${id}/`)
  ).data,
});

export default EventsManager;
