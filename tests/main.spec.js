import chai, { expect } from 'chai'
import Sinon from 'sinon'
import sinonChai from 'sinon-chai'

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/main'

global.fetch = require('node-fetch')
chai.use(sinonChai)

describe('Spotify API', () => {
  describe('smoke test', () => {
    it('should exist the search method', () => {
      expect(search).to.exist
    })

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist
    })

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist
    })

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist
    })

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist
    })
  })

  describe('Generic Search', () => {
    let stubedFetch
    let promise

    beforeEach(() => {
      stubedFetch = Sinon.stub(global, 'fetch')
      promise = stubedFetch.resolves({ json: () => ({ body: 'json' }) })
    })
    afterEach(() => {
      stubedFetch.restore()
    })

    it('should call fetch fucntion', () => {
      const artists = search()
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artists = search('Incubus', 'artist')
        expect(stubedFetch).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist'
        )

        const albums = search('Incubus', 'album')
        expect(stubedFetch).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=album'
        )
      })

      context('passing more then one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album'])
        expect(stubedFetch).to.have.been.calledWith(
          'https://api.spotify.com/v1/search?q=Incubus&type=artist,album'
        )
      })
    })

    it('should return the JSON Data from Promise', () => {
      promise.resolves({ body: 'json' })
      const artists = search('Incubus', 'artist')

      expect(artists.resolveValue).to.be.eql({ body: 'json' })
      // artists.then(data => expect(data).to.be.eql({ body: 'json' }))
    })
  })
})
