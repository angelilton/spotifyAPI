import chai, { expect } from 'chai'
import sinon, { spyCall } from 'sinon'
import { it } from 'mocha'
import sinonChai from 'sinon-chai'
import sinonStubPromise from 'sinon-stub-promise'

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album'

sinonStubPromise(sinon)
chai.use(sinonChai)
global.fetch = require('node-fetch')

describe('Album', () => {
  let stubedFetch
  let promise

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch')
    promise = stubedFetch.returnsPromise()
  })

  afterEach(() => {
    stubedFetch.restore()
  })

  describe('smoke tests', () => {
    it('should have a getAlbum method', () => {
      expect(getAlbum).to.exist
    })

    it('should have a getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist
    })
  })

  describe('getAlbum', () => {
    // verificar se fetch ocorre
    it('should call fetch method', () => {
      const album = getAlbum()
      expect(stubedFetch).to.have.been.calledOnce
    })

    // verificar se o fetch ocorre com a URL desejada
    it('should call fetch with the correct URL', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy'
      )

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRAnG')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRAnG'
      )
    })

    // verificar se o dado é recebido pela promise
    it('should return the correct data from promise', () => {
      promise.resolves({ album: 'name' })
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy')
      expect(album.resolveValue).to.be.eql({ album: 'name' })
    })
  })

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums()
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fetch with the correct URL ', () => {
      const albums = getAlbums([
        '4aawyAB9vmqN3uQ7FjRGTy',
        '4aawyAB9vmqN3uQ7FjRGTk'
      ])
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk'
      )
    })

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' })
      const albums = getAlbums([
        '4aawyAB9vmqN3uQ7FjRGTy',
        '4aawyAB9vmqN3uQ7FjRGTk'
      ])
      expect(albums.resolveValue).to.be.eql({ album: 'name' })
    })
  })

  describe('getAlbumsTracks', () => {
    it('should fetch method', () => {
      const tracks = getAlbumTracks()
      expect(stubedFetch).to.have.been.calledOnce
    })

    it('should call fech with the correct URL', () => {
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy')
      expect(stubedFetch).to.have.been.calledWith(
        'https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks'
      )
    })

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' })
      const tracks = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy')
      expect(tracks.resolveValue).to.be.eql({ album: 'name' })
    })
  })
})
