import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import SpotifyAPI from '../src/index'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Search', () => {
  let spotify
  let stubedFetch
  let promise

  beforeEach(() => {
    spotify = new SpotifyAPI({
      token: 'foo'
    })
    stubedFetch = sinon.stub(global, 'fetch')
    promise = stubedFetch.returnsPromise()
  })

  afterEach(() => {
    stubedFetch.restore()
  })

  describe('smoke test', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist
    })

    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist
    })

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist
    })

    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist
    })
  })

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus')
      expect(stubedFetch).to.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      )

      const artists2 = spotify.search.artists('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=artist'
      )
    })
  })

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Incubus')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=album'
      )

      const albums2 = spotify.search.albums('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=album'
      )
    })
  })

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Incubus')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=track'
      )

      const tracks2 = spotify.search.tracks('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=track'
      )
    })
  })

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const playlists = spotify.search.playlists('Incubus')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL', () => {
      const playlists = spotify.search.playlists('Incubus')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Incubus&type=playlist'
      )

      const playlists2 = spotify.search.playlists('Muse')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/search?q=Muse&type=playlist'
      )
    })
  })
})
