"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var admin = require("firebase-admin");
if (!admin.apps.length) {
    admin.initializeApp();
}
exports.db = admin.firestore();
