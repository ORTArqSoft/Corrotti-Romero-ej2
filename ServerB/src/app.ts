import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import * as datoRecordController from "./controllers/datoRecordController";
import * as amqp from 'amqplib/callback_api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
//Este es el router de express que define las URL. Expone la URL y lo deriva a un metodo del controller. A su vez el controller le va con los servicios de MONGO

// subscriber-list.ts


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

    // Crear una cola temporal para este suscriptor
    channel.assertQueue('', {
      exclusive: true
    }, (error2, q) => {
      if (error2) {
        throw error2;
      }

      console.log(' [*] Waiting for logs. To exit press CTRL+C');

      const topic = 'info'; // Replace with desired topic. En este caso es el mismo del suscriber

      // Enlazar la cola temporal al exchange de lista usando un routingKey 
      channel.bindQueue(q.queue, exchange, topic);

      // Consumir mensajes de la cola
      channel.consume(q.queue, (msg) => {
        if (msg && msg.content) {
          const data = JSON.parse(msg.content.toString());
          datoRecordController.createDatoRecord(data);
        }
      }, {
        noAck: true
      });
    });
  });
});


app.get("/dato-records", datoRecordController.getAllDatoRecords);
app.post("/dato-records", datoRecordController.createDatoRecord);

console.log("process.env.MONGO_URI ", process.env.MONGO_URI);
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
