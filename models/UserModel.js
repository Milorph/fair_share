"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const Mongoose = require("mongoose");
class UserModel {
    constructor(dbConnectionString) {
        this.dbConnectionString = dbConnectionString;
        this.createSchema();
        this.createModel();
    }
    createSchema() {
        this.schema = new Mongoose.Schema({
            userID: String,
            username: String,
            userEmail: String,
            userDebtsOwed: [
                { debtID: String,
                    loanAmount: Number,
                    senderID: String,
                    receiverID: String
                }
            ],
            userDebtsOwedTo: [
                { debtID: String,
                    debtAmount: Number,
                    receiverID: String,
                    senderID: String }
            ],
            userReceiptsList: [String],
            userBalance: Number,
            userFriendRequestsSent: [{ requestID: String }],
            userFriendRequestsReceived: [{ requestID: String }],
            userGroupsList: [{ groupID: String }]
        }, { collection: "users" });
    }
    createModel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Mongoose.connect(this.dbConnectionString);
                this.model = Mongoose.model("Users", this.schema);
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    retreiveAllUsers(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            try {
                const usersArray = yield query.exec();
                response.json(usersArray);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retreiveSpecificUser(response, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOne({ "userID": userID });
            try {
                const user = yield query.exec();
                response.json(user);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    retreiveAllUsersCount(response) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.find({});
            try {
                const userList = yield query.exec();
                const count = userList.length;
                console.log(count);
                response.json({ "count": count });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    addReceiptID(receiptID, userID) {
        return __awaiter(this, void 0, void 0, function* () {
            // query to find user based on userID and updated the receiptList 
            const query = this.model.findOneAndUpdate({ userID: userID }, { $push: { userReceiptsList: receiptID } }, { new: true });
            try {
                const user = yield query.exec();
                return user;
            }
            catch (e) {
            }
        });
    }
    addDebtsOwed(response, receiverID, senderID, amount, debtID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOneAndUpdate({ userID: receiverID }, {
                $push: {
                    userDebtsOwed: {
                        debtID: debtID,
                        loanAmount: amount,
                        receiverID: receiverID,
                        senderID: senderID
                    }
                }
            }, { new: true });
            try {
                return yield query.exec();
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
    addDebtsOwedTo(response, receiverID, senderID, amount, debtID) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.model.findOneAndUpdate({ userID: senderID }, {
                $push: {
                    userDebtsOwedTo: {
                        debtID: debtID,
                        debtAmount: amount,
                        receiverID: receiverID,
                        senderID: senderID
                    }
                }
            }, { new: true });
            try {
                return yield query.exec();
            }
            catch (e) {
                console.log(e);
                throw e;
            }
        });
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map