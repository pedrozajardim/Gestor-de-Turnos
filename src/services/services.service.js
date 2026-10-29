import ServicesRepository from "../repositories/services.repository.js"



class ServicesService {
    constructor(repository = new ServicesRepository()) {
        this.repository = repository
    }

async getServices({ category, available, page = 1, limit = 5, sortBy, order } = {}) {
    const filter = {};
    if (category) {
        filter.category = category;
    }
    if (available !== undefined) {
        filter.available = available === "true";
    }
    const options = {
        page: Number(page),
        limit: Number(limit)
    };

    if (sortBy) {
        options.sort = { [sortBy]: order === "desc" ? -1 : 1 };
    }

    return await this.repository.getPaginated(filter, options);
}

    async getServiceById(id) {
        const service = await this.repository.getById(id);

        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service;
    }



    async createService(data) {
        const { name, description, duration, price, category, available } = data
        if (!name || !description || !duration || !price || !category) {
            throw new Error("Faltan campos por llenar")
        }
        if (price < 0) {
            throw new Error("Hay que corregir el precio, no puede ser negativo")
        }
        return this.repository.create({ name, description, duration, price, category })
    }

    async updateService(id, data) {
        const service = await this.repository.update(id, data)
        if(!service){
            throw new Error("Servicio no encontrado")
        }
        return service
    }

    async deleteService(id) {
        const service = await this.repository.delete(id)
        if(!service){
            throw new Error("Servicio no encontrado")
        }
        return service
    }
}

export default ServicesService;