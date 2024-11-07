import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { ListDetailUserController } from './controllers/user/ListDetailUserController';
import { ListUserBalanceController } from './controllers/user/ListUserBalanceController';
import { CreateReceiveController } from './controllers/receive/CreateReceiveController';
import { ListReceivesController } from './controllers/receive/ListReceivesController';
import { DeleteReceiveController } from './controllers/receive/DeleteReceiveController';
import { EditReceiveController } from './controllers/receive/EditReceiveController'; 

import { isAuthenticated } from './middlewares/isAuthenticated';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { UpdateUserPasswordController } from './controllers/user/UpdateUserPasswordController';

const router = Router();

router.post('/users', new CreateUserController().handle);
router.put('/users/:id', isAuthenticated, new UpdateUserController().handle); 
router.put('/users/:id/password', isAuthenticated, new UpdateUserPasswordController().handle); 
router.post("/login", new AuthUserController().handle);
router.get("/me", isAuthenticated, new ListDetailUserController().handle);
router.get("/balance", isAuthenticated, new ListUserBalanceController().handle);
router.post("/receive", isAuthenticated, new CreateReceiveController().handle);
router.get("/receives", isAuthenticated, new ListReceivesController().handle);
router.delete("/receives/delete", isAuthenticated, new DeleteReceiveController().handle);
router.put('/receives/edit/:id', isAuthenticated, new EditReceiveController().handle); 

export { router };
