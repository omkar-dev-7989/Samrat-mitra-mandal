export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(error, _req, res, _next) {
  if (error.name === 'ZodError') {
    return res.status(400).json({ message: 'Validation failed', issues: error.issues });
  }
  const status = error.status || 500;
  res.status(status).json({ message: error.message || 'Server error' });
}
