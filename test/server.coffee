express  = require 'express'
path     = require 'path'

PORT        = process.env.PORT || 3000


app = express()
app.set 'port', PORT

app.use(express.static(__dirname + '/example/dist'));
# Until the image optimisation process isn't implemented, hack it like this:
app.use '/img', express.static(__dirname + '/examples/images')
app.use '/dist', express.static( path.join(__dirname, '/../dist/js') )

app.set 'view engine', 'jade'
app.set 'views', __dirname + '/example/templates'

app.get '/', (req, res) ->
    return res.render('index')

if not module.parent
    app.listen app.get('port')
    console.log '\n' + 'Server started and listening on port:' + app.get('port')

module.exports = app
