const handleError = (error, req, res, next) => {
    res.status(error.status || 500).json({
        status: "error",
        code: error.status || 500,
        message: error.message || "Internal Server Error",
        stack: error.stack,
    })
    return next()
}

const asyncHandler = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}

export { handleError, asyncHandler }
