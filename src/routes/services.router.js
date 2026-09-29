import serviceController from "../controllers/service.controller.js";
import { Router } from "express"

const router = Router();


router.get("/", serviceController.getServices)

router.get("/:sid", serviceController.getServiceById)

router.post("/", serviceController.createService)

router.put("/:sid",serviceController.updateService)

router.delete("/:sid", serviceController.deleteService)

export default router