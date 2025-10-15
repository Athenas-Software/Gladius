import { Request, Response, NextFunction } from "express";

const authenticateToken = async (request: Request, response: Response, next: NextFunction) => {
    const noAuthRoutes = [
        '/health'
    ];

    const isPublic = noAuthRoutes.some(path => request.path.startsWith(path));
    if (isPublic) return next();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
        return response.status(401).json({ error: 'Missing Authorization header' });
    }

    if (authHeader.startsWith('Basic ')) {
        const base64Credentials = authHeader.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
        const [username, password] = credentials.split(':');

        const BASIC_USER = process.env.BASIC_USER || '';
        const BASIC_PASS = process.env.BASIC_PASS || '';

        if (username === BASIC_USER && password === BASIC_PASS) {
            return next();
        }

        return response.status(401).json({ error: 'Invalid Basic Auth credentials' });
    }


    return response.status(401).json({ error: 'Invalid authentication type' });
};

export { authenticateToken };
