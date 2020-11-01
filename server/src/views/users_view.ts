import User from "../models/User";

// User Resolver
export default {
  render(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      admin_rights: user.admin_rights,
    };
  },
};
