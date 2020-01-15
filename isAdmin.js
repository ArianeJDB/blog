function isAdmin(req, res, next) {
    console.log('ññññññññññ',req.user)
    if (req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('You have to be an ADMIN to do this action');
    }
  }

  module.exports = isAdmin;