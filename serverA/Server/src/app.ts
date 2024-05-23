import express, { Express, Request, Response } from 'express';
import { publishMessage } from './publisher-list';

const app = express();

app.use(express.json());

app.post('/createDato', (req: Request, res: Response) => {
    publishMessage(req.body)
    res.status(201).send({ message: 'User created successfully', user: req.body });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});