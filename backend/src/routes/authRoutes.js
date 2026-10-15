import { Router } from 'express';
import { login, logout, getMe, get2FASetupInfo } from '../controllers/authController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

router.post('/login', login);
router.get('/2fa-setup', get2FASetupInfo);
router.post('/logout', requireAuth, logout);
router.get('/me', requireAuth, getMe);

export default router;
