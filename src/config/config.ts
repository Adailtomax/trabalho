import exphbs from 'express-handlebars'
import bodyParser from 'body-parser'
import importExpress from 'express'

export default
class Config {
    _express: importExpress.Application
    exp = importExpress

    dirViews: string = 'src/modules/views/'

    public constructor (expr: importExpress.Application) {
      this._express = expr
      this.express_()
      this.handlebars()
    }

    private express_ () {
      this._express.use(importExpress.json)

      this._express.use(bodyParser.urlencoded({ extended: true }))
      this._express.use(bodyParser.json())
    }

    private handlebars (): void{
      this._express.set('view engine', 'handlebars')
      this._express.set('views', this.dirViews)
      this._express.engine('handlebars', exphbs({
        extname: 'handlebars',
        layoutsDir: this.dirViews + 'layouts',
        defaultLayout: 'main'
      }))
    }
}
