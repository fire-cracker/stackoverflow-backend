import Question from '../database/models/questions';
import Answer from '../database/models/answers';
import User from '../database/models/users';


let foundUserId;
let foundQuestions;
let foundAnswers;


const findUserId = async (userSearchStr) => {
    var regex = new RegExp(".*" + userSearchStr + ".*", "ig");
    foundUserId = await User.find({ 'name': regex }, { __id: 1 });
    return foundUserId
};

const findQuestions = async (userId, limit, page) => {
   return await Question.find({userId}, { __v: 0 })
    .populate('user', '-password -__v')
    .skip((limit * page))
    .limit(limit);
}
const formatUsers = (users, limit, page) => users.map(async(user) => {
    return await findQuestions(user._id, limit, page)
});

export const getQuestionsBySearchParam = async (questonSearchStr, limit, page) => {
    var regex = new RegExp(".*" + questonSearchStr + ".*", "ig");
    foundQuestions = await Question.find(
        {
            $or: [
                { 'title': regex },
                { 'body': regex }
            ]
        },
        { __v: 0 }
    )
        .populate('user', '-password -__v')
        .skip((limit * page))
        .limit(limit);
    return foundQuestions;
}

export const getQuestionsByanswerParam = async (answerSearchStr, limit, page) => {
    var regex = new RegExp(".*" + answerSearchStr + ".*", "ig");
    foundAnswers = await Answer.find({ 'body': regex }, { __v: 0 })
        .populate('question', '-__v')
        .populate('user', '-password -__v')
        .skip((limit * page))
        .limit(limit);
    return foundAnswers
}

export const getQuestionsByUserParam = async (userSearchStr, limit, page) => {
    foundUserId = await findUserId(userSearchStr);
   const result = await Promise.all(formatUsers(foundUserId, limit, page))
   foundQuestions = result.filter(question => question.length)
    return foundQuestions
}