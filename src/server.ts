import { env } from "./config/env.js";
import app from "./app.js";
const port = env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on ${port} port`);
});
