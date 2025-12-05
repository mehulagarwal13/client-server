import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
  createPrivateChat,
  createGroupChat,
  getUserChatRooms,
  getChatRoomMessages,
  getPrivateMessages,
  sendMessage,
  markMessagesAsRead,
  joinGroup,
  leaveGroup,
  getGroupMembers
} from '../controllers/chatController.js';

const router = express.Router();

router.use(protect);

router.post('/private', createPrivateChat);
router.post('/group', createGroupChat);

router.get('/rooms', getUserChatRooms);
router.get('/room/:roomId/messages', getChatRoomMessages);
router.get('/private/:recipientId', getPrivateMessages);

router.post('/send', sendMessage);
router.post('/read', markMessagesAsRead);

router.post('/group/:roomId/join', joinGroup);
router.post('/group/:roomId/leave', leaveGroup);
router.get('/group/:roomId/members', getGroupMembers);

export default router;
