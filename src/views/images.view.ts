import Image from "../models/Image"

export default {
    render(im: Image) {
        return {
            id: im.id,
            url: `http://localhost:3333/uploads/${im.path}`
        }
    },

    renderMany(ims: Image[]) {
        return ims.map(im => this.render(im))
    }
}