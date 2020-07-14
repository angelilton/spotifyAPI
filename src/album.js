import API_URL from './config'

export const getAlbum = id =>
  fetch(`${API_URL}/albums/${id}`).then(data => data.json())

export const getAlbums = ids =>
  fetch(`${API_URL}/albums/?ids=${ids}`).then(data => data.json())

export const getAlbumTracks = id =>
  fetch(`${API_URL}/albums/${id}/tracks`).then(data => data.json())
