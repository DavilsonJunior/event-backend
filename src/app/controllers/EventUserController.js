import User from '../models/User';
import Event from '../models/Event';
import EventUser from '../models/EventUser';

class EventUserController {
  async index(req, res) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const EventUserRegistered = await EventUser.findAll({
      include: [
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'description', 'start_date', 'end_date'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(EventUserRegistered);
  }

  async show(req, res) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const EventUserRegistered = await EventUser.findAll({
      where: { user_id: req.userId },
      include: [
        {
          model: Event,
          as: 'event',
          attributes: ['id', 'description', 'start_date', 'end_date'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(EventUserRegistered);
  }

  async store(req, res) {
    const { idevent } = req.params;

    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const eventExist = await Event.findByPk(idevent);

    if (!eventExist) {
      return res.status(400).json({ error: 'Esse evento não existe' });
    }

    const eventUser = await EventUser.create({
      user_id: req.userId,
      event_id: idevent,
    });

    return res.json(eventUser);
  }
}

export default new EventUserController();
