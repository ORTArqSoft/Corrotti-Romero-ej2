import express from 'express';
import { publishMessage } from './publisher-list';

const app = express();

app.use(express.json());

app.get('/createDato', (req, res) => {
    publishMessage(req.body)
    res.send('Dato creado y enviado por cola');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});