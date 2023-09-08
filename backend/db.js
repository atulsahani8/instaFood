const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://instaFood:instaFood123@cluster0.9j7ttnb.mongodb.net/instaFood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    const collection = mongoose.connection.db.collection("foodData");

    // Find all documents in the 'foodData' collection and convert the cursor to an array
    const fetchedData = await collection.find({}).toArray();

    // Check if 'fetchedData' has any documents
    if (fetchedData.length > 0) {
      global.foodData = fetchedData;
    } else {
      console.log("No data found in 'foodData' collection.");
    }

    // Fetch data from 'food_items' collection
    const foodCategoryCollection = mongoose.connection.db.collection("food_items");
    const categoryData = await foodCategoryCollection.find({}).toArray();

    if (categoryData.length > 0) {
      global.food_items = categoryData;
    } else {
      console.log("No data found in 'food_items' collection.");
    }
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = mongoDB;
