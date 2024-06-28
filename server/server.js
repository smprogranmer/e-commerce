const app = require('./app');
const mongodb_url = require("./config/db");

// app.get("/", (req, res) => {
//   res.send("hello");
// });
app.listen(process.env.PORT, (req, res) => {
  console.log(`server is listening on port ${process.env.PORT}`);
  mongodb_url();
});
