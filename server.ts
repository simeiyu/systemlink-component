const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Parameter } = require('suanpan_node_sdk');

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

