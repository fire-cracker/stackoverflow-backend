import mongoose from 'mongoose';

import db from './index';

const Schema = mongoose.Schema;

const questionSchema = new Schema({
title: {
    type: String,
    required: [true, 'What is the title']

},
body: {
    type: String,
    required: [true, 'Describe your question']

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

questionSchema.virtual('user', {
    ref: 'User',
    localField: 'userId', 
    foreignField: '_id',
    justOne : true
});

questionSchema.set('toObject', { virtuals: true });
questionSchema.set('toJSON', { virtuals: true });
const Question = db.model('Question', questionSchema); 

export default Question;