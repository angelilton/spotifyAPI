import { searchAlbums } from '../src/index'
global.fetch = require('node-fetch')

const albums = searchAlbums('muse')
albums.then(data => data.albums.items.map(item => console.log(item.name)))
