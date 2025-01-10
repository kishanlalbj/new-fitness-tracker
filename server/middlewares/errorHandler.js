export default (err, _req, res, _next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const obj = {
    success: false,
    status,
    message,
  };

  if (process.env.NODE_ENV !== "production") obj["stack"] = err.stack;

  res.status(status).send(obj);
};
