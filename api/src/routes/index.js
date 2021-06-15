import express from 'express'
import { carModel } from '../database/models/car.js'
import { commentModel } from '../database/models/comment.js'

const router = express.Router()
const Car = carModel
const Comment = commentModel

router.get('/cars', async (req, res) => {
    Car.find({})
        .populate('comments').
        then((cars) => {
            res.json(cars)
        }
        ).catch(e =>
            console.error(e)
        )
})

router.post('/cars', (req, res) => {
    const { designation } = req.body
    Car.create(req.body)
        .then(c => res.send("Car created"))
        .catch(({ errmsg }) => {
            return res.status(500).send(errmsg)
        })
})
router.post('/cars/:id', (req, res) => {
    const { comment } = req.body
    Comment.create(req.body).
        then((com) => {
            return Car.findOneAndUpdate({ _id: req.params.id },
                {
                    $push: {
                        comments: com._id
                    }
                },
                { new: true }
            )
        })
        .then(d => {
            Car.find({})
                .populate('comments').then(cars => {
                    res.json(cars)
                })
        })
        .catch(({ errmsg }) => {
            return res.status(500).send(errmsg)
        })
})


export { router }