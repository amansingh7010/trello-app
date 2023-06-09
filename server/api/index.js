const app = require("../src/app");
const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log("[index] Server is up on port " + port);
});

module.exports = app;
