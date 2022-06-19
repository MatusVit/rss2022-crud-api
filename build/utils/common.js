"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserObject = exports.getRequestData = exports.checkUsersObject = void 0;
var checkUsersObject = function (user) {
    return !!(typeof user.username === 'string' && typeof user.age === 'number' && Array.isArray(user.hobbies));
};
exports.checkUsersObject = checkUsersObject;
var getRequestData = function (request) {
    return new Promise(function (resolve, reject) {
        var body = '';
        request.on('data', function (chunk) {
            body += chunk.toString();
        });
        request.on('end', function () {
            try {
                var userObject = JSON.parse(body);
                resolve(userObject);
            }
            catch (error) {
                reject(error);
            }
        });
    });
};
exports.getRequestData = getRequestData;
var checkUserObject = function (userObject) {
    var user = userObject;
    return !!(user.username &&
        typeof user.username === 'string' &&
        user.age &&
        typeof user.age === 'number' &&
        user.hobbies &&
        Array.isArray(user.hobbies));
};
exports.checkUserObject = checkUserObject;
