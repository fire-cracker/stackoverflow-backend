import mongoose from 'mongoose';

import db from './index';

const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
questionId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: Question
},
userId: {
    required: true,
    type: Schema.Types.ObjectId,
    ref: User
}
})

const Subscriber = db.model('Answer', subscriberSchema); 

export default Subscriber;