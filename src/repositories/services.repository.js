import ServicesDao from "../dao/services.dao.js"


class ServicesRepository {
    constructor(dao = new ServicesDao()) {
        this.dao = dao
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async getPaginated(filter,option){
        return await this.dao.getPaginated(filter,option)
    }

    async create(data) {
        return await this.dao.create(data)
    }

    async update(id, data) {
        return await this.dao.update(id, data)
    }

    async delete(id) {
        return await this.dao.delete(id)
    }

}

export default ServicesRepository;