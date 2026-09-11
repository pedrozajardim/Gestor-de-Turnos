import crypto from 'crypto'

class ServiceManager {
    constructor() {
        this.services = [];
    }

    getServices() {
        return this.services;
    }

    getServiceById(id) {
        return this.services.find(service => service.id === id);
    }

    addService(name, description, price, available) {
        const newService = {
            id: crypto.randomUUID(), name, description, price, available
        };
        this.services.push(newService);
        return newService;
    }

    updateService(id) {
        const service = this.getServiceById(id);
        if (!service) { return null; }
        service.name = service.name ?? service.name;
        service.description = service.description ?? service.description;
        service.price = service.price ?? service.price;
        service.available = service.available ?? service.available;
        return service
    }

    deleteService(name) {
        const index = this.service.findIndex(service => service.name === name);
        if (index === -1) { return null };
        return this.services.splice(index, 1)[0];
    }
}

export default ServiceManager;
