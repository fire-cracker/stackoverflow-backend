import mongoose from 'mongoose';

import db from './index';

const Schema = mongoose.Schema;

const answerSchema = new Schema({
body: {
    type: String,
    required: [true, 'Describe your question']

},
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

const Answer = db.connect.model('Answer', answerSchema); 


export default Answer;