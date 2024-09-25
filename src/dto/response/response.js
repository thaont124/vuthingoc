class ResponseDto {
    constructor(success, message, data, statusCode, metaData = null) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.metaData = metaData;
    }
}

module.exports = { ResponseDto };
