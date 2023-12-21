const amqp = require('amqplib');

const connect = async () => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    return { connection, channel };
  } catch (error) {
    console.error('Error connecting to RabbitMQ:', error.message);
  }
};

module.exports = connect;
