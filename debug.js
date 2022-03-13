const redis = require('redis');
const client = redis.createClient();
client.connect();

client.on('connect', function() {
  console.log('Connected!');
});
client.set('framework', 'ReactJS');