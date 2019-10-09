import mongoose from 'mongoose';

import db from './index';

const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
questionId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'Question'
},
userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: 'User'
}
})

subscriberSchema.virtual('user', {
    ref: 'User',
    localField: 'userId', 
    foreignField: '_id',
    justOne : true
});

subscriberSchema.virtual('question', {
    ref: 'Question',
    localField: 'questionId', 
    foreignField: '_id',
    justOne : true
});

subscriberSchema.set('toObject', { virtuals: true });
subscriberSchema.set('toJSON', { virtuals: true });

const Subscriber = db.model('Subscriber', subscriberSchema); 

export default Subscriber;