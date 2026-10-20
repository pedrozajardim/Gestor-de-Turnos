export const validate = (schema, source = "body") => (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
        return res.status(400).json({
            status: "error",
            message: "Datos inválidos",
            errors: result.error.issues.map((i) => ({
                field: i.path.join("."),
                message: i.message,
            })),
        });
    }
    req.validated = { ...req.validated, [source]: result.data };
    next();
};