import express from 'express';
import indexRouter from './routes';
import connectDB from './loader/db';
import path from 'path';
import { reminderService } from './services';
import moment from 'moment';
const cron = require('node-cron');
const app = express();

// __dirname 은 현재 폴더의 경로
const apidocPath = path.join(__dirname, '../apidoc');

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// 문서를 보여줄 경로를 적고, static 파일을 연다.
app.use('/apidoc', express.static(apidocPath));

// Connect Database
connectDB();

// Define Routes
app.use('/', indexRouter);

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
  .listen(5000, () => {
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

const isDatePassed = async () => {
  try {
    // 리마인더의 모든 데이터 가져오기.
    const resultArray = await reminderService.findAllReminder();

    // 추후에는 1로 되어있는 것들만 가져와서, 체크해주면 된다.
    //

    // 오늘 기준으로 지났는지 안지났는지, 체크하는 함수
    const today = moment().format('YYYY-MM-DD');

    //console.log();

    for (var remind of resultArray) {
      if (remind.date < today) {
        await reminderService.modifyReminderChangeIsPassed({ reminderIdx: remind._id });
      } else {
        await reminderService.modifyReminderChangeIsNotPassed({ reminderIdx: remind._id });
      }
    }

    console.log('지난 것, 지나지 않은 것 구별 성공!');
  } catch (err) {
    console.error(err.message);
  }
};

//isDatePassed();

cron.schedule(
  '0 0 * * *',
  () => {
    isDatePassed();
  },
  {
    scheduled: true,
    timezone: 'Asia/Seoul',
  }
);
