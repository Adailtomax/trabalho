/* eslint-disable no-new */
import importExpress from 'express'
import importBodyParser from 'body-parser'
import importSession from 'express-session'
import RouterCliente from './usuario/cliente'
import RouterUsuario from './usuario/usuario'
import Functions from './functions'
import RouterNvidia from './produtos/videocard/nvidia'
import RouterIphone from './produtos/smartphone/iphone'
import RouterXiaomi from './produtos/smartphone/xiaomi'
import RouterSamsung from './produtos/smartphone/samsung'

export default
class Routes {
  func: Functions
  express: importExpress.Application
  bodyParser = importBodyParser
  session = importSession
  options = { logged: false }

  public constructor (expr_: importExpress.Application) {
    this.func = new Functions()
    this.express = expr_
    this.express.use(this.bodyParser.urlencoded({ extended: true }))
    this.express.use(this.session({
      secret: 'asdasd',
      resave: true,
      saveUninitialized: true
    }))

    this.index()

    new RouterCliente(this.express, this.func)
    new RouterUsuario(this.express, this.func)

    new RouterNvidia(this.express, this.func)

    new RouterIphone(this.express, this.func)
    new RouterXiaomi(this.express, this.func)
    new RouterSamsung(this.express, this.func)
  }

  private index () {
    this.express.get('/', (req, res) => {
      this.func.globalRender(req, res, 'index')
    })
  }
}
