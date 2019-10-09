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

 answerSchema.virtual('user', {
    ref: 'User',
    localField: 'userId', 
    foreignField: '_id',
    justOne : true
});

 answerSchema.set('toObject', { virtuals: true });
 answerSchema.set('toJSON', { virtuals: true });

const Answer = db.model('Answer', answerSchema); 


export default Answer;