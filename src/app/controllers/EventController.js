import * as Yup from 'yup';
import { parseISO, startOfHour, isBefore } from 'date-fns';

import User from '../models/User';
import Event from '../models/Event';
import EventUser from '../models/EventUser';

class EventController {
  async show(req, res) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const events = await Event.findAll({
      where: { user_id: req.userId, canceled_at: null },
    });

    return res.json(events);
  }

  async index(req, res) {
    const events = await Event.findAll({ where: { canceled_at: null } });

    return res.json(events);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      date_initial: Yup.date().required(),
      date_final: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Por favor! Preencha todos os dados corretamente.' });
    }

    const { description, date_initial, date_final } = req.body;

    const eventExist = await Event.findOne({
      where: { description },
    });

    if (eventExist) {
      return res.status(401).json({
        error: 'Voce nao pode criar eventos com o mesmo nome!',
      });
    }

    const start_date = parseISO(date_initial);
    const end_date = parseISO(date_final);

    const hourStart = startOfHour(start_date);

    if (isBefore(hourStart, new Date())) {
      return res
        .status(400)
        .json({ error: 'Datas no passado não são permitidas' });
    }

    const event = await Event.create({
      description,
      start_date,
      end_date,
      user_id: req.userId,
    });

    await EventUser.create({
      user_id: req.userId,
      event_id: event.id,
    });

    return res.json(event);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
      date_initial: Yup.date(),
      date_final: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Por favor! Preencha todos os dados corretamente.' });
    }

    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const { description, date_initial, date_final } = req.body;

    const start_date = parseISO(date_initial);
    const end_date = parseISO(date_final);

    const { idevent } = req.params;

    await Event.update(
      { description, start_date, end_date },
      {
        where: { id: idevent, user_id: req.userId },
      }
    );

    const events = await Event.findByPk(idevent);

    return res.json(events);
  }

  async delete(req, res) {
    const userExists = await User.findByPk(req.userId);

    if (!userExists) {
      return res.status(400).json({ error: 'Usuário não existe' });
    }

    const { idevent } = req.params;

    await EventUser.destroy({ where: { event_id: idevent } });

    const event = await Event.findByPk(idevent);

    if (!event) {
      return res.status(400).json({ error: 'Esse evento não existe' });
    }

    event.canceled_at = new Date();

    await event.save();

    return res.json(event);
  }
}

export default new EventController();
