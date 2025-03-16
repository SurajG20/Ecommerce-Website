import Settings from './Settings.js';

export const seedSettings = async () => {
  try {
    const maintenanceMode = await Settings.findOne({
      where: { key: 'maintenance_mode' },
    });

    if (!maintenanceMode) {
      await Settings.create({
        key: 'maintenance_mode',
        value: false,
        type: 'boolean',
        description: 'When enabled, the site will be in maintenance mode and only admins can access it.',
        isPublic: true,
      });
      console.log('✅ Maintenance mode setting created');
    }
  } catch (error) {
    console.error('Error seeding settings:', error);
    throw error;
  }
};

export const runSeeders = async () => {
  try {
    await seedSettings();
    console.log('✅ All seeders completed successfully');
  } catch (error) {
    console.error('❌ Error running seeders:', error);
    throw error;
  }
};
