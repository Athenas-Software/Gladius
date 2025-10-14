import { Server } from 'socket.io';
import { createServer } from 'http';

export function initSockets(httpServer: ReturnType<typeof createServer>) {
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("chat_message", (msg) => {
            // io.emit("chat_message", msg);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });

    return io;
}
