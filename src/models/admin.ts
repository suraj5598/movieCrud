import mongoose, { Schema } from 'mongoose';

const AdminSchema: Schema = new Schema({
  name: { type: String, default: null },
  email: { type: String, default: null },
  password: { type: String, default: null },
  createdAt: { type: String, default: new Date().toISOString() },
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
