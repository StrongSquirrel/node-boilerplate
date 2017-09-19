import promiseRouter from 'express-promise-router';
import validationMiddleware from 'middlewares/validation';
import LoginPostRequest from 'requests/auth/login';
import expressValidator from 'express-validator';
import expressValidationOptions from 'requests/options';
import postLogin from 'actions/auth/post';
import getLogin from 'actions/auth/get';
import AudioPostRequest from 'requests/audio/post';
import postAudio from 'actions/audio/post';

const router = promiseRouter();
router.use(expressValidator(expressValidationOptions));
router.get('/login', getLogin);
router.post('/login', validationMiddleware(LoginPostRequest, '/login'), postLogin);
router.post('/audio', validationMiddleware(AudioPostRequest, '/login'), postAudio);

export default router;
