const { EventEmitter } = require('node:event');

class BaseClient extends EventEmitter {
  constructor() {
    super();
  }
}

module.exports = BaseClient;
