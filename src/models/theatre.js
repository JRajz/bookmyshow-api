module.exports = (queryInterface, DataTypes) => {
  const model = queryInterface.define(
    'theatre',
    {
      theatre_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      theatre_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
    },
    {
      timestamps: false,
    },
  );

  model.associate = (models) => {
    model.belongsTo(models.city, { foreignKey: 'city_id' });

    model.hasMany(models.screen, { foreignKey: 'theatre_id' });

    model.belongsToMany(models.movie, { through: models.show });
  };

  return model;
};
