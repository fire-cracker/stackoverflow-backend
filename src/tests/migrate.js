var mongoose = require('mongoose');

import db from '../database/models';

export const reconnect = (done) => {
    if (mongoose.connection.readyState === 0) {
        db.connect();
    }

    return done();
};

export const clear = (done) => {
    for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
    }

    return done();
};

export const disconnect = (done) => {
    db.disconnect();
    return done();
};