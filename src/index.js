import express from 'express';
import bodyParser from 'body-parser';
import queryRoutes from './controllers/queryController.js';

const app = express();
app.use(bodyParser.json());


app.use('/query', queryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
