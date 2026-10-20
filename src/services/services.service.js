import ServicesRepository from "../repositories/services.repository.js"



class ServicesService {
    constructor(repository = new ServicesRepository()) {
        this.repository = repository
    }

    async getAll({ category, available, page, limit, sortBy, order }) {
        const filter = {};
        if (category) filter.category = category;
        if (available !== undefined) filter.available = available;

        const { docs, total } = await this.repository.getPaginated({ filter, page, limit, sortBy, order });
        const totalPages = Math.max(1, Math.ceil(total / limit));

        return {
            services: docs,
            total,
            page,
            limit,
            totalPages,
            hasPrevPage: page > 1,
            hasNextPage: page < totalPages,
        };
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
        return this.repository.create({ name, description, duration, price, category, available })
    }

    async updateService(id, data) {
        const service = await this.repository.update(id, data)
        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service
    }

    async deleteService(id) {
        const service = await this.repository.delete(id)
        if (!service) {
            throw new Error("Servicio no encontrado")
        }
        return service
    }
}

export default ServicesService;