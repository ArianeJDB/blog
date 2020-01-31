function isPublisher(req, res, next) {
  
    if (req.user.role === 'publisher' || req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('You have to be registered to do this action');
    }
  }

  module.exports = isPublisher;
