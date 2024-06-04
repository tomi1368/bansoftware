import UserService from "../services/user.service.js";

export class UserController {
  async getOne(req, res) {
    try {
      const user = await UserService.getUser(req.query.user_dni);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
