"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./loader/db"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
// __dirname 은 현재 폴더의 경로
const apidocPath = path_1.default.join(__dirname, "../apidoc");
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(express_1.default.json());
// 문서를 보여줄 경로를 적고, static 파일을 연다.
app.use("/apidoc", express_1.default.static(apidocPath));
// Connect Database
db_1.default();
// Define Routes
app.use("/", routes_1.default);
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "production" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
app
    .listen(5000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
})
    .on("error", (err) => {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map