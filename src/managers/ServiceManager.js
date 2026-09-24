import { error } from 'console'
import crypto from 'crypto'
import fs from 'fs/promises'

class ServiceManager {
    constructor(path) {
        this.path = path
    }

    async #readServices(){
        const data = await fs.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }

    async #writeServices(services){
        await fs.writeFile(this.path, JSON.stringify(services, null, 2))
    }

    async getServices() {
        return await this.#readServices();
    }

    async getServiceById(id) {
        const services = await this.#readServices();
        return services.find(service => service.id === id);
    }

    async addService({ name, description, duration, price, category, available }) {
        const services = await this.#readServices();
        const newService = {
            id: crypto.randomUUID(), name, description, duration, price, category, available
        };
        services.push(newService)
        await this.#writeServices(services)
        return newService;
    }

    async updateService(id, data) {
        const service = await this.#readServices();
        const index = service.findIndex(s => s.id === id);
        if(index === -1){return null}
        service[index] = {
            ...service[index],
            ...data
        }
        await this.#writeServices(service)
        return service
    }

    async deleteService(id) {
        const services = await this.#readServices();
        const index = services.findIndex(service => service.id === id);
        if (index === -1) { return null; }
        return services.splice(index, 1)[0];
    }
}

export default ServiceManager;