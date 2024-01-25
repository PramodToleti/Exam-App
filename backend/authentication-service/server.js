// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");

// require("../shared/config/config");

// const ConnectToDatabase = require("../shared/admin/admin");

// const app = express();

// const corsOptions = {
//   origin: `${process.env.FRONDEND_LINK}`,
//   credentials: true,
//   optionSuccessStatus: 200,
//   Headers: true,
//   exposedHeaders: "Set-Cookie",
//   methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
//   allowedHeaders: [
//     "Access-Control-Allow-Origin",
//     "Content-Type",
//     "Authorization",
//   ],
// };
// app.use(cors(corsOptions));

// app.use(morgan("dev"));
// app.use(express.json());
// app.use(cookieParser());

const app = require("../init/init");

const ConnectToDatabase = require("../shared/admin/admin");

app.use("/api/student/", require("./routes/students.routes"));

app.get("/", (_, res) => {
  res.send("Hello World!");
});

ConnectToDatabase();

const PORT = process.env.AUTHENTICATION_PORT || 9001;

app.listen(PORT, () => {
  console.log(`Authentication Serice is running on port ${PORT}`);
});
