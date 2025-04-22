// clearDatabase.js

const mongoose = require("mongoose");

const clearDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://rajkumarvermamyself:CWcTrHkgWMbaqTFu@cluster0.ngrlxn6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const collections = await mongoose.connection.db.collections();

    for (const collection of collections) {
      const name = collection.collectionName;
      await collection.deleteMany({});
      console.log(`✅ Cleared data from: ${name}`);
    }

    console.log("🎉 All data cleared. Collections are intact.");
    await mongoose.disconnect();
  } catch (err) {
    console.error("❌ Error clearing data:", err);
  }
};

clearDatabase();
