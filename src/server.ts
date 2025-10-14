import express from 'express';
import { createServer } from 'http';
import { initSockets } from './socket/socket';
import "reflect-metadata";
import { warning } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;
const httpServer = createServer(app);

initSockets(httpServer)

app.use(express.json());
process.env.TZ = "America/Sao_Paulo";

app.use(express.json({ limit: "50mb" }))
// app.use(authenticateToken)
// app.use(router)
app.use(warning)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
