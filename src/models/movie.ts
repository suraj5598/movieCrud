import mongoose, { Schema } from 'mongoose';

const movieSchema: Schema = new Schema({
  name: { type: String, default: null },
  year: { type: Number, default: null },
  description: { type: String, default: null },
  poster: { type: String, default: null },
  createdAt: { type: String, default: new Date().toISOString() },
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
