import { AnyQueryBuilder, Model, snakeCaseMappers } from "objection";

export default class Products extends Model {
    id!: number
    display!: boolean


    order?: number

    created_at?: Date | null = null
    updated_at?: Date | null = null

    static columnNameMappers = snakeCaseMappers();

    static tableName = 'products';

    // Optional JSON schema. This is not the database schema! Nothing is generated
    // based on this. This is only used for validation. Whenever a model instance
    // is created it is checked against this schema. http://json-schema.org/.
    static jsonSchema = {
        type: 'object',
        required: [],

        properties: {
            id: { type: 'integer' },
            
            display: { type: ['boolean'] },
            
            order: { type: ['integer'] },
            created_at: { type: ['timestamp'] },
            updated_at: { type: ['timestamp'] },
        }
    }


    $beforeInsert() {
        this.created_at = new Date();
    }

    $beforeUpdate() {
        this.updated_at = new Date();
    }



}