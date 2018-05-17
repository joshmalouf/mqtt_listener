// Imports the Google Cloud client library
const PubSub = require(`@google-cloud/pubsub`);

// Creates a client
const pubsub = new PubSub({
	projectId: 'myiotproject-202021',	
	keyFilename: './credentials/key.json'
	});  

/**
 * TODO(developer): Uncomment the following lines to run the sample.
 */
const subscriptionName = 'LAPTOP';
const timeout = 300;

// References an existing subscription
const subscription = pubsub.subscription(subscriptionName);

// Create an event handler to handle messages
let messageCount = 0;


const messageHandler = message => {
  console.log(`Received message: ${message.id},\tFrom Device: ${message.attributes.deviceId}`);

  const data = JSON.parse(message.data);
  console.log(`\ttimestamp:${data.timeStamp}`);
  console.log(`\tdatapoint1:${data.datapoint1}`);
  //attributes = message.attributes;
  //console.log(attributes);
  messageCount += 1;


  // "Ack" (acknowledge receipt of) the message
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received.`);
}, timeout * 1000);
