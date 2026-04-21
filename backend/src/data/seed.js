require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Content = require('../models/Content');
const User = require('../models/User');
const sample = require('./sample-content.json');

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Content.deleteMany({});
  await User.deleteMany({ role: { $ne: 'admin' } });

  await Content.insertMany(sample);

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@malagasyflix.mg';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin1234!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await User.findOneAndUpdate(
    { email: adminEmail },
    {
      name: 'Admin MalagasyFlix',
      email: adminEmail,
      passwordHash,
      role: 'admin',
      subscriptionStatus: 'active',
      subscriptionEndsAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
    },
    { upsert: true, new: true }
  );

  console.log('Seed done');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
