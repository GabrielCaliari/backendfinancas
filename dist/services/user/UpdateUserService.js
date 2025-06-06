"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserService = void 0;
var bcryptjs_1 = require("bcryptjs");
var prisma_1 = __importDefault(require("../../prisma"));
var UpdateUserService = /** @class */ (function () {
    function UpdateUserService() {
    }
    UpdateUserService.prototype.execute = function (_a) {
        var id = _a.id, name = _a.name, email = _a.email, password = _a.password, avatarUrl = _a.avatarUrl;
        return __awaiter(this, void 0, void 0, function () {
            var userExists, userWithEmail, updatedData, _b, _c, user;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0: return [4 /*yield*/, prisma_1.default.user.findUnique({
                            where: { id: id },
                        })];
                    case 1:
                        userExists = _e.sent();
                        if (!userExists) {
                            throw new Error('User not found');
                        }
                        if (!email) return [3 /*break*/, 3];
                        return [4 /*yield*/, prisma_1.default.user.findFirst({
                                where: {
                                    email: email,
                                    NOT: { id: id },
                                },
                            })];
                    case 2:
                        userWithEmail = _e.sent();
                        if (userWithEmail) {
                            throw new Error('Email already in use');
                        }
                        _e.label = 3;
                    case 3:
                        _b = [__assign(__assign({}, (name && { name: name })), (email && { email: email }))];
                        _c = password;
                        if (!_c) return [3 /*break*/, 5];
                        _d = {};
                        return [4 /*yield*/, (0, bcryptjs_1.hash)(password, 8)];
                    case 4:
                        _c = (_d.password = _e.sent(), _d);
                        _e.label = 5;
                    case 5:
                        updatedData = __assign.apply(void 0, [__assign.apply(void 0, _b.concat([(_c)])), (avatarUrl && { avatarUrl: avatarUrl })]);
                        return [4 /*yield*/, prisma_1.default.user.update({
                                where: { id: id },
                                data: updatedData,
                                select: {
                                    id: true,
                                    name: true,
                                    email: true,
                                    balance: true,
                                    avatarUrl: true,
                                    created_at: true,
                                    updated_at: true,
                                },
                            })];
                    case 6:
                        user = _e.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    return UpdateUserService;
}());
exports.UpdateUserService = UpdateUserService;
