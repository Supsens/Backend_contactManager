export const errorhandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case 400:
            res.json({ title: "validataion error", message: err.message, stackTrace: err.stack });
            break;
        case 404:
            res.json({ title: "Not found", message: err.message, stackTrace: err.stack });
            break;
        case 401:
            res.json({ title: "Unauthorized", message: err.message, stackTrace: err.stack });
            break;
        case 403:
            res.json({ title: "Forbidden", message: err.message, stackTrace: err.stack });
            break;
        default:
            res.json({ title: "Server error", message: err.message, stackTrace: err.stack });
            break;
    }


};