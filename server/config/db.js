// const mongoose = require('mongoose')

// const mongodb_url = async(req,res)=>{
//     try {
//         await mongoose.connect(process.env.DB_URL)
//         console.log('mongodb is connected')
//     } catch (error) {
//         console.log(process.env.DB_UR)
//         console.log(error)
//         process.exit(1)
//     }
// }

// module.exports = mongodb_url

const mongoose = require('mongoose');

// Serverless-এর জন্য কানেকশন ক্যাশ করার গ্লোবাল ভ্যারিয়েবল
let isConnected = false;

const mongodb_url = async (req, res) => {
  // ১. যদি আগে থেকেই কানেক্টেড থাকে, তবে নতুন করে কানেক্ট করার দরকার নেই
  if (isConnected || mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      bufferCommands: false, // Buffering বন্ধ রাখবে যাতে ১০ সেকেন্ড ঝুলে না থাকে
    });

    isConnected = db.connections[0].readyState;
    console.log('mongodb is connected');
  } catch (error) {
    console.log('DB Connection Error:', error);
    // process.exit(1) তুলে দেওয়া হয়েছে কারণ এটি Serverless প্রসেস ক্র্যাশ করিয়ে দেয়
    throw error;
  }
};

module.exports = mongodb_url;