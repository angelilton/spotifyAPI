import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/index'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Search', () => {
  let stubedFetch
  let promise

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch')
    promise = stubedFetch.returnsPromise()
  })

  afterEach(() => {
    stubedFetch.restore()
  })

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
    })
  })

  describe('searchAtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('Incubus')
      expect(stubedFetch).to.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      )

      const artists2 = searchArtists('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      )
    })
  })
  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=album'
      )

      const albums2 = searchAlbums('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=album'
      )
    })
  })

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=track'
      )

      const tracks2 = searchTracks('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=track'
      )
    })
  })

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('Incubus')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
      )

      const playlists2 = searchPlaylists('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=playlist'
      )
    })
  })
})
