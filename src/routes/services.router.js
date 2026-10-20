import serviceController from "../controllers/service.controller.js";
import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
    createServiceSchema,
    updateServiceSchema,
    listServicesQuerySchema,
} from "../schemas/service.schema.js";

const router = Router();

router.get("/", validate(listServicesQuerySchema, "query"), serviceController.getServices);

router.get("/:sid", serviceController.getServiceById);

router.post("/", validate(createServiceSchema), serviceController.createService);

router.put("/:sid", validate(updateServiceSchema), serviceController.updateService);

router.delete("/:sid", serviceController.deleteService);

export default router;