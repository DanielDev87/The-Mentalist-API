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
            nullable: false
        },
        description: {
            type: "text",
            nullable: true,
          },
        imageUrl: {
        type: "varchar",
        nullable: true,
        },
    },
});