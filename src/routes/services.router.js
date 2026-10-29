import serviceController from "../controllers/service.controller.js";
import { Router } from "express"
import { validate } from "../middlewares/validate.middleware.js";
import { createServiceSchema, updateServiceSchema } from "../validations/service.validation.js";

const router = Router();

router.get("/", serviceController.getServices)

router.get("/:sid", serviceController.getServiceById)

router.post("/", validate(createServiceSchema), serviceController.createService)

router.put("/:sid", validate(updateServiceSchema), serviceController.updateService)

router.delete("/:sid", serviceController.deleteService)

export default router