const app = require('./app');
const connectDB = require("./config/db");

// app.get("/", (req, res) => {
//   res.send("hello");
// });
connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})


exports.module = app;