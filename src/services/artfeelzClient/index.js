import axios from "axios";

import AuthManager from "./auth-manager.js";
import ArtworksManager from "./artworks-manager.js";
import EventsManager from "./events-manager.js";
import ArtistsManager from "./artists-manager.js";


export default (config) => {
  const transformResponse = (data) => {
    if (!data) return null

    // TODO: we should have serialization here
    const jsonData = JSON.parse(data)

    // TODO: check for paginatedResponse another way
    // TODO: this doesn't have actual pagination, just returns the results
    if (jsonData.results && jsonData.count)
      return jsonData.results

    return jsonData
  }

  axios.defaults.headers.common['Content-Type'] = 'application/json'
  if (config.token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${config.token}`
  }


  let conn = axios.create(
    {
      baseURL: config.apiUrl,
      timeout: 10000,
      transformResponse
    }
  )

  return {
    auth: AuthManager(conn),
    artworks: ArtworksManager(conn),
    events: EventsManager(conn),
    artists: ArtistsManager(conn),
  }
}
