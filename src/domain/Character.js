const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Character',
    tableName: 'characters',
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
        equipo: {
            type: 'many-to-one', // Un personaje pertenece a un solo equipo
            target: 'Equipo', // Relaciona con la entidad Equipo
            joinColumn: { name: 'equipo_id' },
            nullable: true, // Un personaje puede no pertenecer a un equipo
        },
    },
});
