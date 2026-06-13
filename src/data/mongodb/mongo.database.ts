import mongoose from 'mongoose';

interface MongoDBOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  public static async connect(options: MongoDBOptions): Promise<boolean> {
    const {
      dbName,
      mongoUrl,
    } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });

      console.log('Connected to MongoDB');
      return true;
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      return false;
    }
  }
}
