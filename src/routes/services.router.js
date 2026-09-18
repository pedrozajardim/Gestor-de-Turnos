import ServiceManager from "../manager/ServiceManager.js"
import { Router } from "express"

const router = Router();

const serviceManager = new ServiceManager()

router.get("/", async (req, res) => {
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
        console.log(error)
        res.status(500).json({ message: "Error al obtener los servicios" })
    }
})

router.get("/:sid", async (req, res) => {
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
})

router.post("/", async (req, res) => {
    try {
        const { name, description, duration, price, category, available } = req.body
        if (!name || !description || !duration || !price || !category) {
            return res.status(400).json({ error: "Faltan campos por llenar" })
        }
        const newService = await serviceManager.addService({ name, description, duration, price, category, available });
        res.status(201).json(newService)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "Error al obtener el servicio" })
    }
})

router.put("/:sid", async (req, res) => {
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
        res.status(500).json({ message: "Error al obtener el servicio" })
    }
})

router.delete("/:sid", async (req, res) => {
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
        res.status(500).json({ message: "Error al obtener el servicio" })
    }
})

export default router