import mongoose from 'mongoose';

import db from './index';

const Schema = mongoose.Schema;

const voteSchema = new Schema({
    questionId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Question'
    },
    userId: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    upVote: {
        type: Boolean,
        required: true,
        default: false
    },
    downVote: {
        type: Boolean,
        required: true,
        default: false
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Vote = db.model('Vote', voteSchema);

export default Vote;