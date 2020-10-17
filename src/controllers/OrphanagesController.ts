import { Request, Response } from "express"
import orphanageView from "../views/orphanages_view"
import * as Yup from "yup"

import { getRepository } from "typeorm"
import Orphanage from "../models/Orphanages"

export default {
    async index(req: Request, res: Response) {
        const orphanagesRepository = getRepository(Orphanage)

        const orphanages = await orphanagesRepository.find({
            relations: ["images"]
        })

        return res.json(orphanageView.renderMany(orphanages))
    },

    async show(req: Request, res: Response) {
        const { id } = req.params

        const orphanagesRepository = getRepository(Orphanage)

        const orphanage = await orphanagesRepository.findOneOrFail(id, {
            relations: ["images"]
        })

        return res.json(orphanageView.render(orphanage))
    },

    async create(req: Request, res: Response) {
        const {
            name,
            about,
            longitude,
            latitude,
            open_on_weekends,
            opening_hours,
            instructions
        } = req.body
    
        const orphanagesRepository = getRepository(Orphanage)

        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            about,
            longitude,
            latitude,
            open_on_weekends,
            opening_hours,
            instructions,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            about: Yup.string().required().max(300),
            longitude: Yup.number().required(),
            latitude: Yup.number().required(),
            open_on_weekends: Yup.boolean().required(),
            opening_hours: Yup.string().required(),
            instructions: Yup.string().required(),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })
        
        await schema.validate(data, {
            abortEarly: false
        })

        const orphanage = orphanagesRepository.create(data)
    
        await orphanagesRepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    }
}