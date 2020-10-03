import User from '../models/User';
import Event from '../models/Event';
import EventUser from '../models/EventUser';

class EventUserController {
  async index(req, res) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const EventUserRegistered = await EventUser.findAll({
      where: { user_id: req.userId },
    });

    return res.json(EventUserRegistered);
  }

  async store(req, res) {
    const { idevent } = req.params;

    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const eventExist = await Event.findByPk(idevent);

    if (!eventExist) {
      return res.status(400).json({ error: 'Event does not exists' });
    }

    const eventUser = await EventUser.create({
      user_id: req.userId,
      event_id: idevent,
    });

    return res.json(eventUser);
  }
}

export default new EventUserController();
