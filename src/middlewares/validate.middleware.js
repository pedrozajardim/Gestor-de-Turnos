export const validate = (schema, source = "body") => {
    return (req, res, next) => {
        const result = schema.safeParse(req[source]);

        if (!result.success) {
            const errores = result.error.issues.map(issue => issue.message);
            return res.status(400).json({ error: errores });
        }

        if (source === "body") {
            req.body = result.data;
        }

        next();
    };
};