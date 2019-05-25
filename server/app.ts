import * as bb from 'express-busboy';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as compression from 'compression'
import * as cors from 'cors';
import setRoutes from './routes';

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

bb.extend(app, {
  upload: true,
  allowedPath: /./
});

dotenv.load({ path: '.env' });

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '../public')));

app.use(morgan('dev'));
// mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });

// const db = mongoose.connection;
// (<any>mongoose).Promise = global.Promise;

setRoutes(app);

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(app.get('port'), () => {
  console.log('App platform listen on ' + app.get('port'));
});

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');



// });

export { app };
