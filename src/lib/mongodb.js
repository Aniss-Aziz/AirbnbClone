import mongoose from 'mongoose';

// Chaîne de connexion en clair
const MONGODB_URI = 'mongodb://airbnbclone:airbnbclone@cluster0.mongodb.net/airbnbclone?retryWrites=true&w=majority';

if (!MONGODB_URI) {
  throw new Error(" MONGODB_UR n'est pas bien définie.");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;