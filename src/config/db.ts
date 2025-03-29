import mongoose, { connect } from "mongoose";

// Change the db name
export const connectToDB = async () => {
  try {
    await connect(
      process.env.MONGO_DB_URL || "mongodb://localhost:27017/meet-up"
    );
  } catch (err) {
    console.log("err", err);
  }
};

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("error", error);
});

db.once("open", () => {
  console.log("Database connected successfully");
});
