const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: '*',
  },
});

const inputValues = {
  "sets": {},
  "inputs": [
    {
      "param": "length",
      "type": "Continuous",
      "max": undefined,
    },
    {
      "param": "width",
      "type": "Continuous",
    },
    {
      "param": "height",
      "type": "Discrete",
    }
  ],
  "variables": [
    { "param": "Volume_x2", "formula": "Volume * 2" },
    { "param": "MyVariable1", "formula": "Volume + abs(Surface)" },
    { "param": "MyVariable2", "formula": "Volume * length" }
  ],
  "outputs": ["Volume", "Surface", "Volume_x2", "MyVariable1", "MyVariable2"],
  "objectives": [{ "objective": "Volume", "option": "MaximizeValue" }],
  "constraints": [{ "function": "10-Surface" }, { "function": "Surface-2" }]
}

// const inputValues = {
//   sets: { '{a} Set_1': [0.1, 0.2] },
//   inputs: [
//     {
//       param: 'length',
//       type: 'Continuous',
//       min: 0,
//       max: 2,
//       default: 1,
//     },
//     {
//       param: 'width',
//       type: 'Continuous',
//       min: 0,
//       max: 2,
//       default: 1,
//     },
//     {
//       param: 'height',
//       type: 'Discrete',
//       min: 0,
//       max: 2,
//       default: 1,
//       set: [0.1, 0.2],
//       setName: '{a} Set_1',
//     },
//   ],
//   outputs: ['Volume', 'Surface'],
//   objectives: [{ objective: 'Volume', option: 'MaximizeValue' }],
//   constraints: [{ function: 'Surface-2' }, { function: '10-Surface' }],
// };

io.on('connection', (client) => {
  console.log('connected', client.id)
  // client.emit('data.load', inputValues);

  client.on('data.get', (data, callback) => {
    console.log('data.get', data)
    callback({out1: inputValues})
  })
  
  client.on('data.save', (data) => {
    console.log('outputValues', data);
  });

  // notify users upon disconnection
  client.on('disconnect', () => {
    client.broadcast.emit('user disconnected', client.id);
  });
});

const PORT = process.env.PORT || 8889;

httpServer.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
