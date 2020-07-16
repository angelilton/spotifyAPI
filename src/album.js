import { API_URL, HEADERS } from './config'

export const getAlbum = id =>
  fetch(`${API_URL}/albums/${id}`, HEADERS).then(data => data.json())

export const getAlbums = ids =>
  fetch(`${API_URL}/albums/?ids=${ids}`, HEADERS).then(data => data.json())

export const getAlbumTracks = id =>
  fetch(`${API_URL}/albums/${id}/tracks`, HEADERS).then(data => data.json())
