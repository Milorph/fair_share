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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express = require("express");
var UserModel_1 = require("./models/UserModel");
var ReceiptModel_1 = require("./models/ReceiptModel");
var FriendRequestModel_1 = require("./models/FriendRequestModel");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var App = /** @class */ (function () {
    function App(mongoDBConnection) {
        this.expressApp = express();
        this.middleware();
        this.routes();
        this.User = new UserModel_1.UserModel(mongoDBConnection);
        this.Receipt = new ReceiptModel_1.ReceiptModel(mongoDBConnection);
        this.FriendRequest = new FriendRequestModel_1.FriendRequestModel(mongoDBConnection);
    }
    App.prototype.middleware = function () {
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: false }));
        this.expressApp.use(function (req, res, next) {
            // Set the Access-Control-Allow-Origin header to allow all domains to access resources
            res.header("Access-Control-Allow-Origin", "*");
            // Set the Access-Control-Allow-Headers to specify which headers can be used in the actual request
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    };
    App.prototype.routes = function () {
        var _this = this;
        var router = express.Router();
        router.get("/app/user", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query All User');
                        return [4 /*yield*/, this.User.retreiveAllUsers(res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        router.get("/app/user/:id", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Query Single User");
                        id = req.params.id;
                        return [4 /*yield*/, this.User.retreiveSpecificUser(res, id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        router.post('/app/user/', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj, doc, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("Adding a user");
                        id = crypto.randomBytes(16).toString("hex");
                        console.log(req.body);
                        jsonObj = req.body;
                        // set the payload's userID
                        jsonObj.userID = id;
                        doc = new this.User.model(jsonObj);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        // save it in the db 
                        return [4 /*yield*/, doc.save()];
                    case 2:
                        // save it in the db 
                        _a.sent();
                        res.send('{"id":"' + id + '"}');
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _a.sent();
                        console.log('object creation failed');
                        console.error(e_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.get('/app/receipt', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Receipt.getAllReceipt(res)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_2 = _a.sent();
                        console.error(e_2);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/app/receipt/:receiptID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var receiptID, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receiptID = req.params.receiptID;
                        console.log("get specific receipt ", receiptID);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Receipt.getSpecificReceipt(res, receiptID)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_3 = _a.sent();
                        console.error(e_3);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.post('/app/receipt', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj, addedReceipt, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = crypto.randomBytes(16).toString("hex");
                        jsonObj = req.body;
                        jsonObj.receiptID = id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.Receipt.addSpecificReceipt(res, jsonObj)];
                    case 2:
                        addedReceipt = _a.sent();
                        console.log(addedReceipt);
                        return [4 /*yield*/, this.User.addReceiptID(res, id, addedReceipt.ownerID.userID)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_4 = _a.sent();
                        console.error(e_4);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        router.get('/app/receipt', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Receipt.getAllReceipt(res)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        e_5 = _a.sent();
                        console.error(e_5);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        router.get('/app/receipt/:receiptID', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var receiptID, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receiptID = req.params.receiptID;
                        console.log("get specific receipt ", receiptID);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.Receipt.getSpecificReceipt(res, receiptID)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        e_6 = _a.sent();
                        console.error(e_6);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); });
        router.post('/app/receipt', function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, jsonObj, addedReceipt, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = crypto.randomBytes(16).toString("hex");
                        jsonObj = req.body;
                        jsonObj.receiptID = id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.Receipt.addSpecificReceipt(res, jsonObj)];
                    case 2:
                        addedReceipt = _a.sent();
                        console.log(addedReceipt);
                        return [4 /*yield*/, this.User.addReceiptID(res, id, addedReceipt.ownerID.userID)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        e_7 = _a.sent();
                        console.error(e_7);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
        // Add routes for FriendRequestModel
        router.get("/app/friendrequest", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var friendRequests;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Query All Friend Requests');
                        return [4 /*yield*/, this.FriendRequest.retrieveAllFriendRequests(res)];
                    case 1:
                        friendRequests = _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
        router.post("/app/friendrequest", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var id, newFriendRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Creating a new Friend Request');
                        id = crypto.randomBytes(16).toString("hex");
                        return [4 /*yield*/, this.FriendRequest.retrieveSpecificFriendRequest(express.response, id)];
                    case 1:
                        newFriendRequest = _a.sent();
                        res.json(newFriendRequest);
                        return [2 /*return*/];
                }
            });
        }); });
        this.expressApp.use('/', router);
    };
    return App;
}());
exports.App = App;
