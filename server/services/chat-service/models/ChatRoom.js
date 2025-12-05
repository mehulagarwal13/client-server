import mongoose from 'mongoose';

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: function() { return this.type === 'group'; }
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['private', 'group'],
    required: true
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'participants.userModel'
    },
    userModel: {
      type: String,
      enum: ['Student', 'Mentor']
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'member'],
      default: 'member'
    },
    joinedAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdBy: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'createdBy.userModel'
    },
    userModel: {
      type: String,
      enum: ['Student', 'Mentor']
    }
  },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  isArchived: {
    type: Boolean,
    default: false
  },
  settings: {
    allowFileSharing: { type: Boolean, default: true },
    allowReactions: { type: Boolean, default: true },
    onlyAdminCanPost: { type: Boolean, default: false }
  }
}, { timestamps: true });

chatRoomSchema.index({ 'participants.user': 1 });
chatRoomSchema.index({ type: 1, updatedAt: -1 });

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

export default ChatRoom;
