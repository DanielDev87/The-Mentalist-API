const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Team',
    tableName: 'teams',
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
        description: {
            type: 'text',
            nullable: true,
        },
        imageUrl: {
            type: 'varchar',
            nullable: true,
        },
    },
    relations: {
        characters: {
            type: 'one-to-many', // Un equipo tiene muchos personajes
            target: 'Character', // Relaciona con la entidad Character
            mappedBy: 'team', // El lado opuesto de la relación se maneja por 'team' en la entidad Character
        },
    },
});
