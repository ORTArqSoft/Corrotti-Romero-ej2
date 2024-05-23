// publisher-list.ts
import * as amqp from 'amqplib/callback_api';


export const publishMessage = (message: string) => {
  const exchange = 'list_logs';
  amqp.connect('amqp://user:password@localhost', (error0, connection) => {
    if (error0) {
      throw error0;
    }
    connection.createChannel((error1, channel) => {
      if (error1) {
        throw error1;
      }
      // Configurar un exchange de tipo direct (lista)
      channel.assertExchange(exchange, 'direct', {
        durable: false
      });
      setInterval(() => {
        const routingKey = 'info'; // You can replace this with any topic

        console.log(" [x] Sent %s:'%s'", routingKey, message);


        // Publicar el mensaje en el exchange de lista
        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
        console.log(" [x] Sent %s:'%s'", routingKey, message);
      }, 1000);
    });
  });
};

