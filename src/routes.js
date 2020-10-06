import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import EventController from './app/controllers/EventController';
import EventUserController from './app/controllers/EventUserController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/events', EventController.index);
routes.get('/events/user', EventController.show);
routes.post('/events', EventController.store);
routes.put('/events/:idevent', EventController.update);
routes.delete('/events/:idevent', EventController.delete);

/**
 * usuario se cadastrando num evento de outro
 */

routes.get('/events/user/registered', EventUserController.show);
routes.get('/events/registered', EventUserController.index);
routes.post('/events/:idevent/register', EventUserController.store);

export default routes;
