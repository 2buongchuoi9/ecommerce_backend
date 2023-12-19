const StatusCode = {
    OK: 200,
    CREATE: 201,
}

const ResponseStatusCode = {
    OK: "Success",
    CREATE: "Create",
}

class SuccessResponse {
    constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ResponseStatusCode.OK, metadata = {} }) {
        this.message = !message ? reasonStatusCode : message
        this.status = statusCode
        this.metadata = metadata
    }
    send(res, headers = {}) {
        return res.status(this.status).json(this)
    }
}

class OK extends SuccessResponse {
    constructor({ message, metadata, options = {} }) {
        super({ message, metadata })
        this.options = options
    }
}
class CREATE extends SuccessResponse {
    constructor({ message, statusCode = StatusCode.CREATE, reasonStatusCode = ResponseStatusCode.CREATE, metadata, options = {} }) {
        super({ message, statusCode, reasonStatusCode, metadata })
        this.options = options
    }
}

export { OK, CREATE, SuccessResponse }
