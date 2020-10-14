import importExpress from 'express'
import importBodyParser from 'body-parser'
// import importCookieParser from 'cookie-parser'
import importSession from 'express-session'

import CtrlCliente from '../modules/controller/ClienteController'

export default
class Routes {
    ctrlCliente: CtrlCliente
    express: importExpress.Application
    bodyParser = importBodyParser
    session = importSession

    public constructor (expr_: importExpress.Application) {
      this.ctrlCliente = new CtrlCliente()
      this.express = expr_
      this.express.use(this.bodyParser.urlencoded({ extended: true }))
      this.express.use(this.session({
        secret: 'asdasd',
        resave: true,
        saveUninitialized: true
      }))
      this.index()

      // User
      this.login()
      this.meucadastro()
      this.cadastro()
      this.minhaconta()
      this.editarcadastro()
      this.meuspedidos()
      this.trocarsenha()
      this.excluirconta()
      this.fecharpedido()
      this.logoff()

      // RTX
      this.rtx()
      this.rtx3090()
      this.rtx3080()
      this.rtx3070()

      // Iphone
      this.iphone()
      this.iphone7series()
      this.iphone8series()
      this.iphone11series()
      this.iphonexseries()

      // Xiaomi
      this.xiaomi()
      this.redmiseries()
      this.miseries()

      // Samsung
      this.samsung()
      this.galaxynoteseries()
      this.galaxysseries()
      this.galaxyaseries()
    }

    private sessionExpired (req, res, redirect: string) {
      if (!req.session.usuario) {
        res.redirect(302, redirect)
      }
    }

    // Index ---------------------------------------------------------------------------------
    private index () {
      this.express.get('/', (req, res) => {
        res.render('index')
      })
    }

    private fecharpedido () {
      this.express.get('/fecharpedido', (req, res) => {
        res.render('fecharpedido')
      })
    }

    // User ---------------------------------------------------------------------------------
    private login () {
      this.express.get('/login', (req, res) => {
        if (req.session.usuario) {
          res.redirect(302, '/minhaconta')
          return
        }

        res.render('user/login')
      })

      this.express.post('/login', (req, res) => {
        if (req.session.usuario) {
          res.redirect(302, '/minhaconta')
          return
        }
        this.ctrlCliente.authentication(req, res, 'user/minhaconta')
      })
    }

    private logoff () {
      this.express.get('/logoff', (req, res) => {
        req.session.usuario = null
        res.redirect(302, '/login')
      })
      this.express.post('/logoff', (req, res) => {
        req.session.usuario = null
        res.redirect(302, '/login')
      })
    }

    private minhaconta () {
      this.express.get('/minhaconta', (req, res) => {
        this.sessionExpired(req, res, '/login')
        res.render('user/minhaconta')
      })
    }

    private editarcadastro () { // Falta POST
      this.express.get('/editarcadastro', (req, res) => {
        this.sessionExpired(req, res, '/login')
        this.ctrlCliente.view(req, res, 'user/editarcadastro')
      })
      this.express.post('/editarcadastro', (req, res) => {
        this.sessionExpired(req, res, '/login')
        this.ctrlCliente.update(req)
        res.redirect(req.get('referer'))
      })
    }

    private meuspedidos () {
      this.express.get('/meuspedidos', (req, res) => {
        this.sessionExpired(req, res, '/login')
        res.render('user/meuspedidos')
      })
    }

    private trocarsenha () { // Falta POST
      this.express.get('/trocarsenha', (req, res) => {
        this.sessionExpired(req, res, '/login')
        res.render('user/trocarsenha')
      })
      this.express.post('/trocarsenha', (req, res) => {
        this.sessionExpired(req, res, '/login')
        this.ctrlCliente.updatePassword(res, req)
        res.render('user/trocarsenha')
      })
    }

    private excluirconta () { // Falta POST
      this.express.get('/excluirconta', (req, res) => {
        this.sessionExpired(req, res, '/login')
        res.render('user/excluirconta')
      })

      this.express.post('/excluirconta', (req, res) => {
        this.sessionExpired(req, res, '/login')
        this.ctrlCliente.delete(req, res)
      })
    }

    private meucadastro () {
      this.express.get('/meucadastro', (req, res) => {
        this.sessionExpired(req, res, '/login')
        this.ctrlCliente.view(req, res, 'user/meucadastro')
      })
    }

    private cadastro () {
      this.express.get('/cadastro', (req, res) => {
        res.render('user/cadastro')
      })

      this.express.post('/cadastro', (req, res) => {
        this.ctrlCliente.register(req, res)
      })
    }

    // RTX ---------------------------------------------------------------------------------
    private rtx () {
      this.express.get('/rtx', (req, res) => {
        res.render('rtx/rtx')
      })
    }

    private rtx3090 () {
      this.express.get('/rtx3090', (req, res) => {
        res.render('rtx/rtx3090')
      })
    }

    private rtx3080 () {
      this.express.get('/rtx3080', (req, res) => {
        res.render('rtx/rtx3080')
      })
    }

    private rtx3070 () {
      this.express.get('/rtx3070', (req, res) => {
        res.render('rtx/rtx3070')
      })
    }

    // Iphone ---------------------------------------------------------------------------------
    private iphone () {
      this.express.get('/iphone', (req, res) => {
        res.render('iphone/iphone')
      })
    }

    private iphone7series () {
      this.express.get('/iphone7series', (req, res) => {
        res.render('iphone/iphone7series')
      })
    }

    private iphone8series () {
      this.express.get('/iphone8series', (req, res) => {
        res.render('iphone/iphone8series')
      })
    }

    private iphone11series () {
      this.express.get('/iphone11series', (req, res) => {
        res.render('iphone/iphone11series')
      })
    }

    private iphonexseries () {
      this.express.get('/iphonexseries', (req, res) => {
        res.render('iphone/iphonexseries')
      })
    }

    // Xiaomi ---------------------------------------------------------------------------------
    private xiaomi () {
      this.express.get('/xiaomi', (req, res) => {
        res.render('xiaomi/xiaomi')
      })
    }

    private miseries () {
      this.express.get('/miseries', (req, res) => {
        res.render('xiaomi/miseries')
      })
    }

    private redmiseries () {
      this.express.get('/redmiseries', (req, res) => {
        res.render('xiaomi/redmiseries')
      })
    }

    // Samsung ---------------------------------------------------------------------------------
    private samsung () {
      this.express.get('/samsung', (req, res) => {
        res.render('samsung/samsung')
      })
    }

    private galaxynoteseries () {
      this.express.get('/galaxynoteseries', (req, res) => {
        res.render('samsung/galaxynoteseries')
      })
    }

    private galaxysseries () {
      this.express.get('/galaxysseries', (req, res) => {
        res.render('samsung/galaxysseries')
      })
    }

    private galaxyaseries () {
      this.express.get('/galaxyaseries', (req, res) => {
        res.render('samsung/galaxyaseries')
      })
    }
}
