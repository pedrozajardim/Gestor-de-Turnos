import { ServicesModel } from "./models/service.model.js"


class ServicesDao {

    async getAll() {
        return await ServicesModel.find();
    }

    async getById(id) {
        return await ServicesModel.findById(id);
    }
    async getPaginated(filter,option) {
        return await ServicesModel.paginate(filter,option);
    }

    async create(data) {
        return await ServicesModel.create(data);
    }

    async update(id, data) {
        return await ServicesModel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ServicesModel.findByIdAndDelete(id);
    }
}

export default ServicesDao;