import Orphanage from "../models/Orphanages"
import imagesView from "./images.view"

export default {
    render(op: Orphanage) {
        return {
            id: op.id,
            name: op.name,
            latitude: op.latitude,
            longitude: op.longitude,
            about: op.about,
            instructions: op.instructions,
            opening_hours: op.opening_hours,
            open_on_weekends: op.open_on_weekends,
            images: imagesView.renderMany(op.images)
        }
    },

    renderMany(ops: Orphanage[]) {
        return ops.map(op => this.render(op))
    }
}