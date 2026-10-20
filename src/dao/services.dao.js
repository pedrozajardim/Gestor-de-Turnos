import { ServicesModel } from "./models/service.model.js"


class ServicesDao {

    async getAll() {
        return await ServicesModel.find();
    }

    async getPaginated({ filter, page, limit, sortBy, order }) {
        const [docs, total] = await Promise.all([
            ServicesModel.find(filter)
                .sort({ [sortBy]: order === "asc" ? 1 : -1 })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            ServicesModel.countDocuments(filter),
        ]);
        return { docs, total };
    }

    async getById(id) {
        return await ServicesModel.findById(id);
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