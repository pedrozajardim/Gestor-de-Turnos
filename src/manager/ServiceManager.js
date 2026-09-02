import crypto from 'crypto'

class serviceManager {
    constructor() {
        this.services = [];
    }

    getServices() {
        return this.services;
    }

    getServicesById(id) {
        return this.services.find(service => service.id === id);
    }

    addServicesData(name, description, price, avaitable) {
        const newService = {
            id: crypto.randomUUID(), name, description, price, avaitable
        };
        this.services.push(newService);
        return newService;
    }

    updateService(updateData) {
        const service = this.getServicesById;
        if (!service) { return null; }
        service.name = updateData.name ?? service.name;
        return service
    }

    deleteService(name) {
        const index = this.service.findIndex(service => service.name === name);
        if (index === -1) { return null };
        return this.services.splice(index, 1)[0];
    }
}

export default ServiceManager;
