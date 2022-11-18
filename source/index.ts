import express from 'express';
import routes from './routes/index';

const app: express.Application = express();
const port: number = 1990;

app.use(routes);
app.listen(port, () => {console.log(`Server is starting at prot:${port}`)
})

export default app