"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsersObject = void 0;
const checkUsersObject = (user) => !!(typeof user.username === 'string' && typeof user.age === 'number' && Array.isArray(user.hobbies));
exports.checkUsersObject = checkUsersObject;
