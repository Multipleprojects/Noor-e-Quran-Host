const AdminModel = require('../models/Admin');

// Get Admin data
const getAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findOne();
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ message: 'Error fetching admin data', error });
  }
};

// Update Admin data
const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from the request parameters
    const { email, password } = req.body;

    // Validate input
    if (!email && !password) {
      return res.status(400).json({ message: 'Email or password must be provided' });
    }

    const admin = await AdminModel.findByIdAndUpdate(
      id,
      { email, password },
      { new: true, runValidators: true }
    );

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).json({ message: 'Error updating admin', error });
  }
};

const createDefaultAdmin = async () => {
  try {
    const defaultAdminEmail = 'safi@gmail.com';
    const defaultAdminPassword = 'safi1234';
    // Check if the admin already exists
    const existingAdmin = await AdminModel.findOne({ email: defaultAdminEmail });
    if (!existingAdmin) {
      // Create default admin
      const defaultAdmin = new AdminModel({
        email: defaultAdminEmail,
        password: defaultAdminPassword,
      });
      await defaultAdmin.save();
      res.status(200).json({message:'Default admin created successfully'});
    } else {
      res.status(400).json({message:'Default admin already exists'});
    }

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

module.exports = {
  getAdmin,
  updateAdmin,
createDefaultAdmin
};
