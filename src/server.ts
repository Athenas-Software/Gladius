import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
process.env.TZ = "America/Sao_Paulo";

app.use(express.json({ limit: "50mb" }))
// app.use(authenticateToken)
// app.use(router)
// app.use(warning)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
