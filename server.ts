const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const { Parameter } = require('suanpan_node_sdk');

const gatewayEndpoint = 'http://sim-gateway.default:7777';
const systemlinkEndpoint = 'http://47.102.131.179:18086';
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = false;
axios.defaults.ContentType = 'application/json;charset=UTF-8';

const dist = __dirname + '/dist';

const app = express();
let port = 3002;
let AppId = 10002;
let NodeId = 222;
let UserId = 100078;
let ComponentId = 110;

app.use(cors({
  origin: '*',
}));

app.engine('html', require('ejs-mate'));
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/assets", express.static(dist + '/assets'))
app.set('views', dist);

app.use('/integration*', async (req, res, next) => {
  const { originalUrl, method, params, body } = req;
  let result;
  switch(method) {
    case 'GET':
      result = await axios({ url: `${systemlinkEndpoint}${originalUrl}`, method, params});
      break;
    case 'POST':
      result = await axios({ url: `${systemlinkEndpoint}${originalUrl}`,method, data: body});
      break;
  }
  const { status, data } = result;
  res.send(data);
  next();
});
app.get('/spContext/get', (req, res) => {
  res.send({
    success: true,
    data: {
      appId: Parameter.AppId || AppId,
      nodeId: Parameter.NodeId || NodeId,
      userId: Parameter.UserId || UserId,
      componentId: Parameter.ComponentId || ComponentId,
    }
  })
});
app.get('/', (req, res) => {
  res.render('index')
});

app.listen(port, () => {
  console.info(`result callback server is listening at :${port}`);
});

