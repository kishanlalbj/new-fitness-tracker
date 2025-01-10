import mongoose from "mongoose";

export class Database {
  static instance;

  constructor(connectionString) {
    if (Database.instance) {
      return Database.instance;
    }

    this.connectionString = connectionString;
    Database.instance = this;
  }

  async connect() {
    if (mongoose.connection.readyState === 0) {
      try {
        await mongoose.connect(this.connectionString);
        console.log("MongoDB connected successfully");
      } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1);
      }
    } else {
      console.log("MongoDB connection already established");
    }
  }

  async disconnect() {
    if (mongoose.connection.readyState !== 0) {
      try {
        await mongoose.disconnect();
        console.log("MongoDB disconnected");
      } catch (error) {
        console.error("Error during MongoDB disconnection:", error.message);
      }
    } else {
      console.log("No active MongoDB connection to disconnect");
    }
  }
}
