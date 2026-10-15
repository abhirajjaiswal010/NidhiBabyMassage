import { Router } from 'express';
import { 
  createEnquiry, 
  getEnquiries, 
  getEnquiryById, 
  updateEnquiry, 
  deleteEnquiry 
} from '../controllers/enquiryController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = Router();

// Public: Submit enquiry
router.post('/', createEnquiry);

// Protected Admin Routes
router.get('/', requireAuth, getEnquiries);
router.get('/:id', requireAuth, getEnquiryById);
router.patch('/:id', requireAuth, updateEnquiry);
router.delete('/:id', requireAuth, deleteEnquiry);

export default router;
