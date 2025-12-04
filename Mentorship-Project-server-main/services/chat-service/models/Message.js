import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel'
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Student', 'Mentor']
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'receiverModel'
  },
  receiverModel: {
    type: String,
    enum: ['Student', 'Mentor']
  },
  chatRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatRoom'
  },
  content: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'image', 'file', 'system'],
    default: 'text'
  },
  fileUrl: {
    type: String,
    default: ''
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readBy: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: 'readBy.userModel'
    },
    userModel: {
      type: String,
      enum: ['Student', 'Mentor']
    },
    readAt: {
      type: Date,
      default: Date.now
    }
  }]
}, { timestamps: true });

messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ chatRoom: 1, createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

export default Message;
