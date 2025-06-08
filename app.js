require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const errorMiddleware = require("./middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser({}));

app.use("/api/task", require("./routes/task.route"));
app.use("/api/auth", require("./routes/auth.route"));

app.use(errorMiddleware);

async function bootstrap() {
  try {
    mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("MongoDB connected");
    });

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`Listening on - http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error with connecting DB - ${error}`);
  }
}

bootstrap();
