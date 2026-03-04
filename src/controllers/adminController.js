const { listUsers } = require('../services/userService');

function getAdminStats(req, res) {
  const users = listUsers();

  const stats = {
    totalUsers: users.length,
    admins: users.filter(u => u.role === 'admin').length,
    normalUsers: users.filter(u => u.role === 'user').length,
    serverTime: new Date().toISOString()
  };

  res.json(stats);
}

module.exports = {
  getAdminStats
};
