import User from "../models/User";
import orphanages_view from "./orphanages_view";

export default {
  render(user: User) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      orphanages: orphanages_view.renderMany(user.orphanages),
    };
  },
};
