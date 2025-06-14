"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var CreateUserController_1 = require("./controllers/user/CreateUserController");
var AuthUserController_1 = require("./controllers/user/AuthUserController");
var ListDetailUserController_1 = require("./controllers/user/ListDetailUserController");
var ListUserBalanceController_1 = require("./controllers/user/ListUserBalanceController");
var CreateReceiveController_1 = require("./controllers/receive/CreateReceiveController");
var ListReceivesController_1 = require("./controllers/receive/ListReceivesController");
var DeleteReceiveController_1 = require("./controllers/receive/DeleteReceiveController");
var EditReceiveController_1 = require("./controllers/receive/EditReceiveController");
var isAuthenticated_1 = require("./middlewares/isAuthenticated");
var UpdateUserController_1 = require("./controllers/user/UpdateUserController");
var UpdateUserPasswordController_1 = require("./controllers/user/UpdateUserPasswordController");
var router = (0, express_1.Router)();
exports.router = router;
router.get('/', function (req, res) {
    res.send('API is running');
});
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.put('/users/:id', isAuthenticated_1.isAuthenticated, new UpdateUserController_1.UpdateUserController().handle);
router.put('/users/:id/password', isAuthenticated_1.isAuthenticated, new UpdateUserPasswordController_1.UpdateUserPasswordController().handle);
router.post("/login", new AuthUserController_1.AuthUserController().handle);
router.get("/me", isAuthenticated_1.isAuthenticated, new ListDetailUserController_1.ListDetailUserController().handle);
router.get("/balance", isAuthenticated_1.isAuthenticated, new ListUserBalanceController_1.ListUserBalanceController().handle);
router.post("/receive", isAuthenticated_1.isAuthenticated, new CreateReceiveController_1.CreateReceiveController().handle);
router.get("/receives", isAuthenticated_1.isAuthenticated, new ListReceivesController_1.ListReceivesController().handle);
router.delete("/receives/delete", isAuthenticated_1.isAuthenticated, new DeleteReceiveController_1.DeleteReceiveController().handle);
router.put('/receives/edit/:id', isAuthenticated_1.isAuthenticated, new EditReceiveController_1.EditReceiveController().handle);
