import { Server, Socket } from "socket.io";

export const initializeSocket = (io: Server) => {
  console.log("socket config");
  connection(io);
  failed(io);
};

const failed = (io: Server) => {
  io.on("connection_error ", (err: any) => {
    console.log("Socket connection failed", err);
  });
};

const connection = (io: Server) => {
  console.log("socket connection");
  io.on("connection", (socket: any) => {
    console.log("Socket connected", socket);
    console.log("token", socket.handshake.auth.token);
    disconnect(socket);
  });
};

const disconnect = (socket: Socket) => {
  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });
};
