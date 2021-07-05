import express from "express";
import indexRouter from "./routes";
import connectDB from "./loader/db";
import path from "path";
const app = express();

// __dirname 은 현재 폴더의 경로
const apidocPath = path.join(__dirname, "../apidoc");

// 문서를 보여줄 경로를 적고, static 파일을 연다.
app.use("/apidoc", express.static(apidocPath))


// Connect Database
connectDB();

app.use(express.json());

// Define Routes
app.use("/", indexRouter);

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