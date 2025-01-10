import HealthStat from "../models/HealthStat.js";

export default class HealthStatService {
  static async saveHealthStat(stat) {
    const healthStat = new HealthStat(stat);
    console.log({ healthStat });
    const savedStat = healthStat.save();

    return savedStat;
  }

  static async getHealthStats(user) {
    const stats = await HealthStat.find({ user });

    return stats;
  }
}
