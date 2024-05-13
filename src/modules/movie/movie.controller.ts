import { Request, Response } from 'express';
import Movie from '../../models/movie';
import { MovieInterface } from './types';
import upload from '../../middlewares/multerUpload'
import Admin from '../../models/admin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';





class MovieController {

    static async loginAdmin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const admin:any = await Admin.findOne({ email });

            if (!admin) {
                return res.status(404).json({ error: 'Admin not found' });
            }

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign({ _id: admin._id,name:admin.name,email:admin.email }, "AdminSecret", { expiresIn: '1h' });

            const response = {
                adminData:admin,
                token:token
            }

            res.status(200).json(response);


        } catch (err) {
            console.error('Error in admin login:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async createMovie(req: Request, res: Response) {
        try {
            const { name, year, description,poster }: MovieInterface = req.body;
    
            const movieData: MovieInterface = {
                name,
                year,
                description,
                poster,
                createdAt: new Date().toISOString()
            };
    
            const newMovie = new Movie(movieData);
            const savedMovie = await newMovie.save();
    
            res.status(200).json(savedMovie);
        } catch (err) {
            console.error('Error creating movie:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async uploadImage(req:Request, res:Response){
        try{
            const filename = req.file?.filename 
            if(!filename){
                res.status(404).json({error:"No File selected"})
            }

            const response = {
                message :"File Upload Successfully",
                filename: filename
            }

            res.status(200).json(response)

        }catch(err){
            console.log("Err in upload image:", err)
            res.status(500).json({error:"Internal server error"})
        }
    }
    
    static async listAllMovies(req: Request, res: Response) {
        try {

            const movies = await Movie.find();
            res.status(200).json(movies);

        } catch (err) {
            console.error('Error in list all movie:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async listMovieById(req: Request, res: Response) {
        try {
            const movieId = req.params._id;
            const query = { _id: movieId }
            const movie = await Movie.find(query);
            if (!movie) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.status(200).json(movie);

        } catch (err) {
            console.error('Error in list movie by id:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async deleteMovie(req: Request, res: Response) {
        try {
            const movieId = req.params._id;
            const query = { _id: movieId }
            const deleteMovie = await Movie.findByIdAndDelete(query);
            if (!deleteMovie) {
                return res.status(404).json({ error: 'Movie not found' });
            }
            res.status(200).json(deleteMovie);

        } catch (err) {
            console.error('Error in delete movie:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async updateMovie(req: Request, res: Response) {
        try {
            const _id = req.body._id
            const { name, description, year ,poster}: MovieInterface = req.body
            const setData: any = {}

            if (name !== null || name !== undefined) {
                setData.name = name
            }
            if (description !== null || description !== undefined) {
                setData.description = description
            }
            if (year !== null || year !== undefined) {
                setData.year = year
            }

            const updateData = await Movie.findByIdAndUpdate({ _id: _id },  setData, { new: true })
            res.status(200).json(updateData);


        } catch (err) {
            console.error('Error in update movie:', err);
            res.status(500).json({ error: 'Internal server error' });

        }
    }

}

export default MovieController