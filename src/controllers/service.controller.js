import ServicesService from "../services/services.service.js";

const servicesService = new ServicesService();

class serviceController {
    static async getServices(req, res) {
        try {
            const services = await servicesService.getServices(req.query);
            res.status(200).json(services);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener todos los servicios" })
        }
    }

    static async getServiceById(req, res) {
        try {
            const { sid } = req.params
            const service = await servicesService.getServiceById(sid);
            res.status(200).json(service)
        }
        catch (error) {
            if (error.message === "Servicio no encontrado") {
                return res.status(404).json({ message: error.message });
            }
            console.log(error)
            res.status(500).json({ message: "Error al obtener el servicio" })
        }
    }

    static async createService(req, res) {
        try {
            await servicesService.createService(req.body);
            res.status(201).json({ message: "servicio creado" })
        }
        catch (error) {
            if (
                error.message === "Faltan campos por llenar" ||
                error.message === "Hay que corregir el precio, no puede ser negativo"
            ) {
                return res.status(400).json({ message: error.message });
            }
            console.log(error)
            res.status(500).json({ message: "Error al querer crear el servicio" })
        }
    }

    static async updateService(req, res) {
        try {
            const { sid } = req.params
            const { id, ...updates } = req.body

            const updatedService = await servicesService.updateService(sid, updates)

            if (!updatedService) {
                return res.status(404).json({ message: "Error al encontrar el servicio" })
            }
            res.status(200).json(updatedService)
        }
        catch (error) {
            if (error.message === "Servicio no encontrado") {
                return res.status(404).json({ message: error.message });
            }
            console.log(error)
            res.status(500).json({ message: "Error al querer modificar el servicio" })
        }
    }

    static async deleteService(req, res) {
        try {
            const { sid } = req.params;
            const deleteService = await servicesService.deleteService(sid)
            res.status(200).json({ message: "Servicio Eliminado" })
        }
        catch (error) {
            if (error.message === "Servicio no encontrado") {
                return res.status(404).json({ message: error.message });
            }
            console.log(error)
            res.status(500).json({ message: "Error al querer eliminar el servicio" })
        }
    }
}

export default serviceController