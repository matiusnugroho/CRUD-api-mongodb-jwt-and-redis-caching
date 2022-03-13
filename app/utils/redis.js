const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');
const dbConfig = require("../config/db.config");

const client = redis.createClient({
    host: dbConfig.REDIS_HOST,
    port: dbConfig.REDIS_PORT,
  });
  client.on("error", function (err) {
    throw err;
  });
  client.on("connect",()=>{
    console.info("Connected to redis");
  })
  client.HGET = util.promisify(client.HGET);

// create reference for .exec
const exec = mongoose.Query.prototype.exec;

// create new cache function on prototype
mongoose.Query.prototype.cache = function(options = { expire: 60 }) {
  this.useCache = true;
  this.expire = options.expire;
  this.hashKey = JSON.stringify(options.key || this.mongooseCollection.name);

  return this;
}

// override exec function to first check cache for data
mongoose.Query.prototype.exec = async function() {
  if (!this.useCache) {
    return await exec.apply(this, arguments);
  }

  const key = JSON.stringify({
    ...this.getQuery(),
    collection: this.mongooseCollection.name
  });
  const cacheValue = await client.HGET(this.hashKey, key);
  if (!cacheValue) {
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result));
    client.expire(this.hashKey, this.expire);

    console.log('Return data from MongoDB');
    return result;
  }
  
  const doc = JSON.parse(cacheValue);
  console.log('Return data from Redis');
  return Array.isArray(doc)
    ? doc.map(d => new this.model(d))
    : new this.model(doc);
};

module.exports = {
  clearHash(hashKey) {
    client.del(JSON.stringify(hashKey));
  }
}