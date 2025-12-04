import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes.js';
import { socketAuth } from './middleware/authMiddleware.js';
import Message from './models/Message.js';
import ChatRoom from './models/ChatRoom.js';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

app.use('/api/chat', chatRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'Chat service is running' });
});

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MONGO_URI environment variable is not set');
  process.exit(1);
}

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Successfully Connected ✅'))
  .catch(err => console.error('MongoDB connection error:', err));

const onlineUsers = new Map();
const userSockets = new Map();

io.use(socketAuth);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId}`);
  
  onlineUsers.set(socket.userId, {
    odeltaId: socket.id,
    role: socket.userRole,
    lastSeen: new Date()
  });
  userSockets.set(socket.userId, socket);

  socket.broadcast.emit('user-online', { userId: socket.userId });

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.userId} joined room ${roomId}`);
  });

  socket.on('leave-room', (roomId) => {
    socket.leave(roomId);
    console.log(`User ${socket.userId} left room ${roomId}`);
  });

  socket.on('send-message', async (data) => {
    try {
      const { receiver, receiverId, receiverModel, chatRoom, content, messageType, fileUrl } = data;
      const senderModel = socket.userRole === 'student' ? 'Student' : 'Mentor';
      const actualReceiver = receiverId || receiver;

      const messageData = {
        sender: socket.userId,
        senderModel,
        content,
        messageType: messageType || 'text',
        fileUrl: fileUrl || ''
      };

      if (chatRoom) {
        messageData.chatRoom = chatRoom;
      } else if (actualReceiver) {
        messageData.receiver = actualReceiver;
        messageData.receiverModel = receiverModel;
      }

      const message = new Message(messageData);
      await message.save();

      if (chatRoom) {
        await ChatRoom.findByIdAndUpdate(chatRoom, {
          lastMessage: message._id,
          updatedAt: new Date()
        });
        io.to(chatRoom).emit('receive-message', message);
      } else if (actualReceiver) {
        const roomId = [socket.userId, actualReceiver].sort().join('-');
        io.to(roomId).emit('receive-message', message);
        
        const receiverSocket = userSockets.get(actualReceiver);
        if (receiverSocket) {
          receiverSocket.emit('receive-message', message);
        }
      }

      socket.emit('message-sent', { success: true, message });
    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('message-error', { error: error.message });
    }
  });

  socket.on('typing', (data) => {
    const { receiver, chatRoom, isTyping } = data;
    
    if (chatRoom) {
      socket.to(chatRoom).emit('user-typing', {
        sender: socket.userId,
        isTyping
      });
    } else if (receiver) {
      const roomId = [socket.userId, receiver].sort().join('-');
      socket.to(roomId).emit('user-typing', {
        sender: socket.userId,
        isTyping
      });
      
      const receiverSocket = userSockets.get(receiver);
      if (receiverSocket) {
        receiverSocket.emit('user-typing', {
          sender: socket.userId,
          isTyping
        });
      }
    }
  });

  socket.on('mark-read', async (data) => {
    try {
      const { messageIds } = data;
      const userModel = socket.userRole === 'student' ? 'Student' : 'Mentor';

      await Message.updateMany(
        { _id: { $in: messageIds } },
        {
          $addToSet: {
            readBy: { user: socket.userId, userModel, readAt: new Date() }
          },
          isRead: true
        }
      );

      socket.emit('messages-read', { success: true, messageIds });
    } catch (error) {
      console.error('Mark read error:', error);
    }
  });

  socket.on('create-group', async (data) => {
    try {
      const { name, description, participantIds } = data;
      const creatorModel = socket.userRole === 'student' ? 'Student' : 'Mentor';

      const participants = [
        { user: socket.userId, userModel: creatorModel, role: 'admin' }
      ];

      if (participantIds) {
        participantIds.forEach(p => {
          if (p.userId !== socket.userId) {
            participants.push({
              user: p.userId,
              userModel: p.userModel,
              role: 'member'
            });
          }
        });
      }

      const chatRoom = new ChatRoom({
        name,
        description,
        type: 'group',
        participants,
        createdBy: { user: socket.userId, userModel: creatorModel }
      });

      await chatRoom.save();

      participants.forEach(p => {
        const participantSocket = userSockets.get(p.user.toString());
        if (participantSocket) {
          participantSocket.join(chatRoom._id.toString());
          participantSocket.emit('group-created', { chatRoom });
        }
      });

    } catch (error) {
      console.error('Create group error:', error);
      socket.emit('group-error', { error: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
    onlineUsers.delete(socket.userId);
    userSockets.delete(socket.userId);
    socket.broadcast.emit('user-offline', { userId: socket.userId });
  });
});

const PORT = process.env.CHAT_PORT || 3004;

httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Chat Service running on port ${PORT}`);
});
