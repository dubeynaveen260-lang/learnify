export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API route is working correctly!',
    timestamp: new Date().toISOString(),
    method: req.method
  });
}