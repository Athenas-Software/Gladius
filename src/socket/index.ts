import { Server } from 'socket.io';
import { createServer } from 'http';

export var io: Server

export function initSockets(httpServer: ReturnType<typeof createServer>) {
    io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
}
