export default (req, res, next) => {
  res.status(404).json({ success: true, result: "Not Fond" });
};
