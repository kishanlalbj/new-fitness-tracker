import multer from "multer";
import jwt from "jsonwebtoken";

const OBESE = "OBESE";
const OVER_WEIGHT = "OVER WEIGHT";
const NORMAL = "NORMAL";
const UNDERWEIGHT = "UNDER WEIGHT";
const UNKNOWN = "UNKNOWN";

const calculateBMI = (weight, height) => {
  return (weight / Math.pow(height / 100, 2)).toFixed(1);
};

const calculateBodyFat = (height, waist, neck) => {
  const cal =
    495 /
    (1.0324 -
      0.19077 * Math.log10(waist - neck) +
      0.15456 * Math.log10(height));

  return (cal - 450).toFixed(1);
};

const calculateBMR = (height, weight, age) => {
  return (10 * weight + 6.25 * height - 5 * age + 5).toFixed(0);
};

const calculateAge = (dateString) => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const calculateBMIResult = (bmi) => {
  bmi = parseInt(bmi);
  switch (bmi) {
    case bmi > 0 && bmi < 19:
      return UNDERWEIGHT;
    case bmi >= 20 && bmi <= 25:
      return NORMAL;
    case bmi > 25 && bmi <= 26:
      return OVER_WEIGHT;
    case bmi >= 25:
      return OBESE;
    default:
      return UNKNOWN;
  }
};

const calculateMaintanenceCalorie = (weight, height, age) => {
  return 10 * weight + 6.25 * height - 5 * age + 5;
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname.toLowerCase()}`);
  },
});

const upload = multer({ storage });

const generateAccessToken = (payload, type) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      type === "refresh"
        ? process.env.JWT_REFRESH_SECRET
        : process.env.JWT_ACCESS_SECRET,
      { expiresIn: type !== "refresh" ? 60 * 60 : "7d" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        resolve(token);
      }
    );
  });
};

export {
  calculateBMI,
  calculateBodyFat,
  calculateBMR,
  calculateAge,
  calculateBMIResult,
  calculateMaintanenceCalorie,
  generateAccessToken,
  upload,
};
