import ServicesRepository from "../repositories/services.repository.js"



class ServicesService {
    constructor(repository = new ServicesRepository()) {
        this.repository = repository
    }

    async getServices({ category, available } = {}) {
        let services = await this.repository.getAll()
        if (category) {
            services = services.filter(s => s.category === category);
        }
        if (available !== undefined) {
            services = services.filter(s => s.available === (available === "true"));
        }
        return services;
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