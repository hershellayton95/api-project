import "dotenv/config";
import config from "./config"

import app from "./app";

const port = config.PORT;

app.listen(port, () => {
    console.log(`[server]: the server started in http://localhost:${port}`);
});

