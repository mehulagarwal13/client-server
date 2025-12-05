import Message from '../models/Message.js';
import ChatRoom from '../models/ChatRoom.js';
import mongoose from 'mongoose';

export const createPrivateChat = async (req, res) => {
  try {
    const { recipientId, recipientModel } = req.body;
    const senderId = req.user.id;
    const senderModel = req.user.role === 'student' ? 'Student' : 'Mentor';

    const existingRoom = await ChatRoom.findOne({
      type: 'private',
      'participants.user': { $all: [senderId, recipientId] }
    });

    if (existingRoom) {
      return res.status(200).json({ chatRoom: existingRoom, isNew: false });
    }

    const chatRoom = new ChatRoom({
      type: 'private',
      participants: [
        { user: senderId, userModel: senderModel, role: 'member' },
        { user: recipientId, userModel: recipientModel, role: 'member' }
      ],
      createdBy: { user: senderId, userModel: senderModel }
    });

    await chatRoom.save();
    return res.status(201).json({ chatRoom, isNew: true });
  } catch (error) {
    console.error('Create private chat error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const createGroupChat = async (req, res) => {
  try {
    const { name, description, participantIds } = req.body;
    const creatorId = req.user.id;
    const creatorModel = req.user.role === 'student' ? 'Student' : 'Mentor';

    const participants = [
      { user: creatorId, userModel: creatorModel, role: 'admin' }
    ];

    if (participantIds && participantIds.length > 0) {
      participantIds.forEach(p => {
        if (p.userId !== creatorId) {
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
      createdBy: { user: creatorId, userModel: creatorModel }
    });

    await chatRoom.save();
    return res.status(201).json({ chatRoom });
  } catch (error) {
    console.error('Create group chat error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getUserChatRooms = async (req, res) => {
  try {
    const userId = req.user.id;

    const chatRooms = await ChatRoom.find({
      'participants.user': userId,
      isArchived: false
    })
    .populate('lastMessage')
    .sort({ updatedAt: -1 });

    return res.status(200).json({ chatRooms });
  } catch (error) {
    console.error('Get user chat rooms error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getChatRoomMessages = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const userId = req.user.id;

    const chatRoom = await ChatRoom.findOne({
      _id: roomId,
      'participants.user': userId
    });

    if (!chatRoom) {
      return res.status(404).json({ msg: 'Chat room not found or access denied' });
    }

    const messages = await Message.find({ chatRoom: roomId })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .lean();

    return res.status(200).json({ 
      messages: messages.reverse(),
      chatRoom,
      page: parseInt(page),
      hasMore: messages.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Get chat room messages error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getPrivateMessages = async (req, res) => {
  try {
    const { recipientId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const userId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: recipientId },
        { sender: recipientId, receiver: userId }
      ]
    })
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .lean();

    return res.status(200).json({ 
      messages: messages.reverse(),
      page: parseInt(page),
      hasMore: messages.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Get private messages error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { 
      receiverId, receiverModel, chatRoomId,
      content, messageType = 'text', fileUrl 
    } = req.body;
    
    const senderId = req.user.id;
    const senderModel = req.user.role === 'student' ? 'Student' : 'Mentor';

    const messageData = {
      sender: senderId,
      senderModel,
      content,
      messageType,
      fileUrl: fileUrl || ''
    };

    if (chatRoomId) {
      messageData.chatRoom = chatRoomId;
    } else if (receiverId) {
      messageData.receiver = receiverId;
      messageData.receiverModel = receiverModel;
    }

    const message = new Message(messageData);
    await message.save();

    if (chatRoomId) {
      await ChatRoom.findByIdAndUpdate(chatRoomId, {
        lastMessage: message._id,
        updatedAt: new Date()
      });
    }

    return res.status(201).json({ message });
  } catch (error) {
    console.error('Send message error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const markMessagesAsRead = async (req, res) => {
  try {
    const { messageIds } = req.body;
    const userId = req.user.id;
    const userModel = req.user.role === 'student' ? 'Student' : 'Mentor';

    await Message.updateMany(
      { _id: { $in: messageIds } },
      {
        $addToSet: {
          readBy: { user: userId, userModel, readAt: new Date() }
        },
        isRead: true
      }
    );

    return res.status(200).json({ msg: 'Messages marked as read' });
  } catch (error) {
    console.error('Mark messages as read error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const joinGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;
    const userModel = req.user.role === 'student' ? 'Student' : 'Mentor';

    const chatRoom = await ChatRoom.findById(roomId);
    
    if (!chatRoom) {
      return res.status(404).json({ msg: 'Chat room not found' });
    }

    if (chatRoom.type !== 'group') {
      return res.status(400).json({ msg: 'Can only join group chats' });
    }

    const isAlreadyMember = chatRoom.participants.some(
      p => p.user.toString() === userId
    );

    if (isAlreadyMember) {
      return res.status(400).json({ msg: 'Already a member of this group' });
    }

    chatRoom.participants.push({
      user: userId,
      userModel,
      role: 'member'
    });

    await chatRoom.save();
    return res.status(200).json({ chatRoom });
  } catch (error) {
    console.error('Join group error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const leaveGroup = async (req, res) => {
  try {
    const { roomId } = req.params;
    const userId = req.user.id;

    const chatRoom = await ChatRoom.findById(roomId);
    
    if (!chatRoom) {
      return res.status(404).json({ msg: 'Chat room not found' });
    }

    chatRoom.participants = chatRoom.participants.filter(
      p => p.user.toString() !== userId
    );

    await chatRoom.save();
    return res.status(200).json({ msg: 'Left the group successfully' });
  } catch (error) {
    console.error('Leave group error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};

export const getGroupMembers = async (req, res) => {
  try {
    const { roomId } = req.params;

    const chatRoom = await ChatRoom.findById(roomId);
    
    if (!chatRoom) {
      return res.status(404).json({ msg: 'Chat room not found' });
    }

    return res.status(200).json({ participants: chatRoom.participants });
  } catch (error) {
    console.error('Get group members error:', error);
    return res.status(500).json({ msg: 'Server error', error: error.message });
  }
};
