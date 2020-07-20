import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import SpotifyAPI from '../src/index'

chai.use(sinonChai)
sinonStubPromise(sinon)

global.fetch = require('node-fetch')

describe('Spotify Library', () => {
  it('should create an instance of SpotifyAPI', () => {
    const spotify = new SpotifyAPI({})
    expect(spotify).to.be.an.instanceof(SpotifyAPI)
  })

  it('should receive apiURL as an option', () => {
    const spotify = new SpotifyAPI({
      apiURL: 'blabla'
    })

    expect(spotify.apiURL).to.be.equal('blabla')
  })

  it('should use the default apiURL if not provided', () => {
    const spotify = new SpotifyAPI({})
    expect(spotify.apiURL).to.be.equal('https://api.spotify.com/v1')
  })

  it('should receive token as an option', () => {
    const spotify = new SpotifyAPI({
      token: 'foo'
    })

    expect(spotify.token).to.be.equal('foo')
  })

  describe('resquest method', () => {
    let stubedFetch
    let promise

    beforeEach(() => {
      stubedFetch = sinon.stub(global, 'fetch')
      promise = stubedFetch.returnsPromise()
    })

    afterEach(() => {
      stubedFetch.restore()
    })

    it('should have request method', () => {
      const spotify = new SpotifyAPI({})
      expect(spotify.request).to.exist
    })

    it('should call fetch when request', () => {
      const spotify = new SpotifyAPI({
        token: 'foo'
      })

      spotify.request('url')
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with right url passed', () => {
      const spotify = new SpotifyAPI({
        token: 'foo'
      })

      spotify.request('url')
      expect(stubedFetch).to.have.been.calledWith('url')
    })
    it('should call fetch with right headers passed', () => {
      const spotify = new SpotifyAPI({
        token: 'foo'
      })

      const headers = {
        headers: {
          Authorization: `'Bearer foo'`
        }
      }

      spotify.request('url')
      expect(stubedFetch).to.have.been.calledWith('url', headers)
    })
  })
})
