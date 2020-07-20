import SpotifyAPI from '../src/index'
global.fetch = require('node-fetch')

const spotify = new SpotifyAPI({
  token:
    'BQAypnkKhcbkG2kb9pHWX3WLkws_QBJR0AwpVCHGec37oXYswpdm0CDxCbDPoPwSHsV40dnutr1_DH-IffsrF9CiRSeaCg2BHtz8KJ8-7Sr6Gmb7XSedgbc_01HMkIHaIiQXnDok555863dYObPKMjESl_c4ZIJozDg6Vna6bA_tTjzh6KdogNbAJZYUFUUnwjH27Q'
})
const albums = spotify.search.albums('tiesto')
albums.then(data => data.albums.items.map(item => console.log(item.name)))
