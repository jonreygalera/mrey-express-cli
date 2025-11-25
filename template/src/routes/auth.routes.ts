import { Router } from 'express';
import { deleteUser, getUserLists, updateUser, registerUser } from '../app/controllers/user.controller';

const router = Router();

router.post('/register', registerUser);
router.get('/users', getUserLists);

router.delete('/delete/:id', deleteUser);
router.patch('/update/:id', updateUser);

export default router;
