import express from 'express';
import MovieController from './movie.controller'
import authenticator from "../../middlewares/auth"
import upload from '../../middlewares/multerUpload';

const router = express.Router()

router.post('/login', MovieController.loginAdmin);

router.post("/upload-image",authenticator,upload.single('poster'),MovieController.uploadImage)
router.post("/create-movie",authenticator,MovieController.createMovie)
router.get("/list-all-movies",authenticator,MovieController.listAllMovies)
router.get("/list-movie/:_id",authenticator,MovieController.listMovieById)
router.delete("/delete-moive/:_id",authenticator,MovieController.deleteMovie)
router.put("/update-movie",authenticator,MovieController.updateMovie)

export default router



