import Ajv from 'ajv';
const ajv = new Ajv();

export class SchemaValidator {

    // Function to validate data against a JSON schema
    static validateSchema(schema: object, data: object): boolean 
    {
        const validate = ajv.compile(schema);
        return validate(data) as boolean;
    }
}