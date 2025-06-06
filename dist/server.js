"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: '*' })); // Permitir todas as origens (modifique conforme necessário)
app.use(function (req, res, next) {
    console.log("Requisi\u00E7\u00E3o recebida: ".concat(req.method, " ").concat(req.url));
    next();
});
app.use(routes_1.router); // Certifique-se de que o router está sendo usado aqui
// Middleware de tratamento de erros
app.use(function (err, req, res, next) {
    console.error('Erro:', err.message);
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }
    return res.status(500).json({
        status: 'error',
        message: 'Internal server errorr.',
    });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () { return console.log("Server Online on port ".concat(PORT)); });
