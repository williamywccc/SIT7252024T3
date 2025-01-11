const io = require('socket.io-client');
const assert = require('chai').assert;

describe('Socket.IO Test', () => {
  it('should connect to the server', (done) => {
    const socket = io('http://localhost:3000');
    socket.on('connect', () => {
      assert.isTrue(socket.connected);
      socket.disconnect();
      done();
    });
  });
});
