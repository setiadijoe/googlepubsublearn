// Imports the Google Cloud client library
const PubSub = require(`@google-cloud/pubsub`);

// Creates a client
const pubsub = new PubSub({
  keyFilename: 'credential.json'
});

/**
 * TODO(developer): Uncomment the following lines to run the sample.
 */
const topicName = 'my-topic';
const data = JSON.stringify({ foo: 'bar' });
const maxMessages = 10;
const maxWaitTime = 10000;

// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
const dataBuffer = Buffer.from(data);

pubsub
  .topic(topicName)
  .publisher({
    batching: {
      maxMessages: maxMessages,
      maxMilliseconds: maxWaitTime,
    },
  })
  .publish(dataBuffer)
  .then(results => {
    const messageId = results[0];
    console.log(`Message ${messageId} published.`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
