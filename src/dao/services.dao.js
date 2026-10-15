import fs from 'fs/promises'
import crypto from 'crypto'


class ServicesDao {
    constructor(path = ("./src/data/services.json")) {
        this.path = path
    }

    async #readServices() {
        const data = await fs.readFile(this.path, "utf-8")
        return JSON.parse(data)
    }

    async #writeServices(services) {
        await fs.writeFile(this.path, JSON.stringify(services, null, 2))
    }

    async getAll() {
        return await this.#readServices();
    }

    async getById(id) {
        const services = await this.#readServices();
        return services.find(service => service.id === id);
    }

    async create(data) {
        const services = await this.#readServices();
        const newService = { id: crypto.randomUUID(), ...data };
        services.push(newService)
        await this.#writeServices(services)
        return newService;
    }

    async update(id, data) {
        const services = await this.#readServices();

        const index = services.findIndex(s => s.id === id);
        if (index === -1) return null;

        services[index] = { ...services[index], ...data };

        await this.#writeServices(services);
        return services[index];
    }

    async delete(id) {
        const services = await this.#readServices();
        const index = services.findIndex(service => service.id === id);
        if (index === -1) { return null; }

        const [deletedService] = services.splice(index, 1);


        await this.#writeServices(services);

        return deletedService;
    }

}

export default ServicesDao