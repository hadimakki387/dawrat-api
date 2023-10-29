const superAdminPersmissions = [
  "getUsers",
  "manageUsers",
  "getPosts",
  "managePosts",
  "getReports",
  "manageReports",
  "getSuggestions",
  "manageSuggestions",
  "getComments",
  "manageComments",
  "getNotes",
  "manageNotes",
];

const adminPersmissions = [
  "getPosts",
  "managePosts",
  "getComments",
  "manageComments",
];

const userPermissions = ["getNotes", "manageNotes"];

const allRoles = {
  upper_admin: superAdminPersmissions,
  admin: adminPersmissions,
  user: userPermissions,
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
