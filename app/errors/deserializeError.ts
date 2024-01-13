export default class DeserializeError extends Error {
    constructor(message: string, error?: DeserializeError) {
        super(error ? `${message} - ${error.message}` : message);
        this.name = 'DeserializeError';
    }
}
