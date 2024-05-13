import Admin from '../models/admin';
import bcrypt from 'bcrypt';
import { AdminInterface } from '../modules/movie/types';

const createAdmin = async () => {
    try {
        // Check if admin exists
        const adminExists = await Admin.findOne({ email: "testadmin@yopmail.com" });
        if (!adminExists) {
            const defaultPassword = '12345678';
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);

            const saveData: AdminInterface = {
                name: "super admin",
                email: "testadmin@yopmail.com",
                password: hashedPassword,
                createdAt:  new Date().toISOString()
            };

            const newAdmin = new Admin(saveData);
            await newAdmin.save();
            console.log('Admin created successfully!');
        } else {
            console.log('Admin already exists.');
        }
    } catch (err) {
        console.error('Error creating admin:', err);
        throw err;
    }
};

export default createAdmin;
