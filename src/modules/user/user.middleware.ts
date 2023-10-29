

const validateRolePermission = (role: string, requestedRole: string) => {
  if (role === 'upper_admin') {
    return true;
  }
  if (role === 'admin' && (requestedRole === 'staff' || requestedRole === 'user')) {
    return true;
  }
  if (role === 'staff' && requestedRole === 'user') {
    return true;
  }
  return false;
};