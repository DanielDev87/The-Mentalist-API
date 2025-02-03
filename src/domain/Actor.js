const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Actor',
    tableName: 'actors',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        name: {
            type: 'varchar',
            nullable: false,
        },
        bio: {
            type: 'text',
            nullable: true,
        },
        birthdate: {
            type: 'date',
            nullable: true,
        },
        imageUrl: {
            type: 'varchar',
            nullable: true,
        },
    },
    relations: {
        character: {
            type: 'many-to-one', // Un actor puede interpretar muchos personajes
            target: 'Character', // Relaciona con la entidad Character
            joinColumn: { name: 'character_id' },
            nullable: true,
        },
    },
});
