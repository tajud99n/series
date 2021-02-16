const { app } = require("./app");
const config = require("./config/config");

// Start Server
app.listen(config.port, () =>
    console.log(`App listening on port - ${config.port}`)
);
