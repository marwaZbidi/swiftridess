const router = require('express').Router();
const UserController = require('../controllers/UserController');

// router.get('/user', authenticateToken, UserController.getUserDetails);

// GET all users
router.get('/users/getall', UserController.getAllUsers);

// GET user by ID
router.get('/users/:id', UserController.getUserById);
//search user by name
 router.get('/users/getName/:name', UserController.searchByName);
// POST create a new user
router.post('/users/add', UserController.createUser);

// PUT update a user by ID
router.put('/users/:id', UserController.updateUserById);

// DELETE a user by ID
router.delete('/users/:id', UserController.deleteUserById);

// router.get('/users/events/:name', UserController.getEvents)

router.get('/company/car/:id', UserController.getCompanyInfoByCarId);

router.get('/company/reservation/:idcompany', UserController.getReservationById);

// router.get('/admin/reservation',UserController.getAllreservation);
// router.get('/reservation',UserController.getAllReservationsWithDetails);
// router.get('/admin/reservation',UserController.getAllNames);

router.post('/company/reservation/:userid/:vehicleid', UserController.createReservation);

router.post('/company/reservation/accept', UserController.acceptReservation); 

router.delete('/company/reservation/delete', UserController.deleteReservation); 

router.post('/company/reservationdate/:vehicleId', UserController.reserveVehicle);


router.get('/user/feedback', UserController.getAllFeedBack);

router.delete('/user/feedback/remove/:idfeedback', UserController.removeFeedback);


router.post('/user/feedback', UserController.createFeedback);

router.get('/carlength', UserController.getCarsLength);

router.get('/companylength', UserController.getCompanyLength);

router.get('/clientlength',UserController.getClientLength);

router.get('/feedbacklength',UserController.getFeedbackLength);

router.get('/carscompany/:company_id', UserController.getcarsLength)

module.exports = router;
