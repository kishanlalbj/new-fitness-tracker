import HttpError from "../utils/HttpError.js";
import { validateHealthStat } from "../utils/validators.js";
import HealthStatService from "../services/HealStatService.js";
import {
  calculateBMI,
  calculateBMR,
  calculateBodyFat,
} from "../utils/index.js";

class HealthStatController {
  static async addStats(req, res, next) {
    try {
      const user = req.user.id;

      const { weight, neck, waist } = req.body;

      const { error } = validateHealthStat({ weight, neck, waist });

      if (error) throw new HttpError(400, error.details[0].message);

      const bmi = calculateBMI(weight, 172);
      const bmr = calculateBMR(172, weight, 30);
      const bodyFat = calculateBodyFat(172, waist, neck);

      const stat = await HealthStatService.saveHealthStat({
        weight,
        neck,
        waist,
        bmi,
        bmr,
        bodyFat,
        user,
      });

      res.status(201).json({ success: true, result: stat });
    } catch (error) {
      next(error);
    }
  }

  static async getStats(req, res, next) {
    try {
      const user = req.user.id;

      const stats = await HealthStatService.getHealthStats(user);

      res.json({ success: true, result: stats });
    } catch (error) {
      next(error);
    }
  }
}

export default HealthStatController;
