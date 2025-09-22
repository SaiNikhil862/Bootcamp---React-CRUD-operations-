import express from "express";
import morgan from "morgan";
import colors from "colors";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import { BootCamp } from "./Routes/bootcamp.js";
import { Courses } from "./Routes/course.js";
import { authRouter } from "./Routes/auth.js";

// Config & DB
import { PORT, NODE_ENV } from "./Config/index.js";
import  connectDb  from "./Config/db.js";

// Middlewares
import { errorhandler } from "./middlewares/error.js";

// ---- Fix __dirname in ESM ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to DB
connectDb();

// Logger
if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(fileUpload());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parse JSON
app.use(express.json());

// Routes
app.use("/api/v1/bootcamps", BootCamp);
app.use("/api/v1/courses", Courses);
app.use("/api/v1/auth", authRouter);

// Error middleware
app.use(errorhandler);

// Start server
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(
    `Server running in ${NODE_ENV} mode on port ${PORT}`.green.bold
  );
});
