import ServiceManager from "../managers/ServiceManager.js";

const serviceManager = new ServiceManager("./src/data/services.json")

class serviceController {
    static async getServices(req, res) {
        try {
            let services = await serviceManager.getServices();
            const { category, available } = req.query;

            if (category) {
                services = services.filter(s => s.category === category);
            }
            if (available !== undefined) {
                services = services.filter(s => s.available === (available === "true"));
            }
            res.status(200).json(services);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener todos los servicios" })
        }
    }

    static async getServiceById(req, res) {
        try {
            const { sid } = req.params
            const service = await serviceManager.getServiceById(sid);

            if (!service) {
                return res.status(404).json({ message: "Servicio no Encontrado" })
            }
            res.status(200).json(service)
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al obtener el servicio" })
        }
    }

    static async createService(req, res) {
        try {
            const { name, description, duration, price, category, available } = req.body
            if (!name || !description || !duration || !price || !category) {
                return res.status(400).json({ error: "Faltan campos por llenar" })
            }
            const newService = await serviceManager.addService({ name, description, duration, price, category, available });
            res.status(201).json({ message: "servicio creado" })
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al querer crear el servicio" })
        }
    }

    static async updateService(req, res) {
        try {
            const { sid } = req.params
            const { id, ...updates } = req.body

            const updatedService = await serviceManager.updateService(sid, updates)

            if (!updatedService) {
                return res.status(404).json({ message: "Error al encontrar el servicio" })
            }
            res.status(200).json(updatedService)
        }
        catch (error) {
            console.log(error)
            res.status(500).json({ message: "Error al querer modificar el servicio" })
        }
    }

    static async deleteService (req, res) {
    try {
        const { sid } = req.params;
        const deleteService = await serviceManager.deleteService(sid)

        if (!deleteService) {
            return res.status(404).json({ message: "Error al obtener el servicio" })
        }
        res.status(200).json({ message: "Servicio Eliminado" })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al querer eliminar el servicio" })
    }
}
}

export default serviceController