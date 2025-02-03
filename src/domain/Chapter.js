const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Chapter',
    tableName: 'chapters',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid',
        },
        title: {
            type: 'varchar',
            nullable: false,
        },
        description: {
            type: 'text',
            nullable: true,
        },
        date: {
            type: 'date',
            nullable: true,
        },
    },
    relations: {
        characters: {
            type: 'many-to-many', // Un capítulo puede tener varios personajes
            target: 'Character', // Relaciona con la entidad Character
            joinTable: true, // Usa una tabla de unión
            joinColumns: [{ name: 'chapter_id' }],
            inverseJoinColumns: [{ name: 'character_id' }],
        },
    },
});
