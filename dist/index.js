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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const db_1 = __importDefault(require("./loader/db"));
const path_1 = __importDefault(require("path"));
const services_1 = require("./services");
const moment_1 = __importDefault(require("moment"));
const cron = require('node-cron');
const app = (0, express_1.default)();
// __dirname 은 현재 폴더의 경로
const apidocPath = path_1.default.join(__dirname, '../apidoc');
app.use(express_1.default.urlencoded({
    extended: false,
}));
app.use(express_1.default.json());
// 문서를 보여줄 경로를 적고, static 파일을 연다.
app.use('/apidoc', express_1.default.static(apidocPath));
// Connect Database
(0, db_1.default)();
// Define Routes
app.use('/', routes_1.default);
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'production' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
app
    .listen(3000, () => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000 🛡️
    ################################################
  `);
})
    .on('error', (err) => {
    console.error(err);
    process.exit(1);
});
const isDatePassed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 리마인더의 모든 데이터 가져오기.
        // const resultArray = await reminderService.findAllReminder();
        // 추후에는 0(안지난 것)로 되어있는 것들만 가져와서, 체크해주면 된다.
        const resultArray = yield services_1.reminderService.findIsPassedReminder();
        // 오늘 기준으로 지났는지 안지났는지, 체크하는 함수
        const today = (0, moment_1.default)().format('YYYY-MM-DD');
        for (var remind of resultArray) {
            if (remind.date < today) {
                yield services_1.reminderService.modifyReminderChangeIsPassed({ reminderIdx: remind._id });
            }
            else {
                yield services_1.reminderService.modifyReminderChangeIsNotPassed({ reminderIdx: remind._id });
            }
        }
    }
    catch (err) {
        console.error(err.message);
    }
});
//isDatePassed();
cron.schedule('0 0 * * *', () => {
    isDatePassed();
}, {
    scheduled: true,
    timezone: 'Asia/Seoul',
});
//# sourceMappingURL=index.js.map