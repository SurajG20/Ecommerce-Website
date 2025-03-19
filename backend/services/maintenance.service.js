import Settings from '../models/Settings.js';

export class MaintenanceService {
  static async toggleMaintenanceMode(enabled, userId) {
    const setting = await Settings.findOne({
      where: { key: 'maintenance_mode' },
    });

    if (!setting) {
      throw new Error('Maintenance mode setting not found');
    }

    await setting.update({
      value: enabled,
      updatedBy: userId,
    });

    return setting;
  }

  static async getMaintenanceMode() {
    const setting = await Settings.findOne({
      where: { key: 'maintenance_mode' },
    });

    return setting?.value ?? false;
  }
}
