import * as jsonServer from 'json-server'
import * as https from 'https'
import * as fs from 'fs'
import { Express } from 'express'
import { handleAuthentication } from './auth'
import { handleAuthorization } from './authz'

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem')
}

server.use(middlewares)
server.use(jsonServer.bodyParser)

server.post('/login', handleAuthentication)
server.use('/orders', handleAuthorization)

server.use(router)

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running secure')
})
