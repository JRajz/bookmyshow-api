module.exports = (queryInterface, DataTypes) => {
  const model = queryInterface.define(
    'city',
    {
      city_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      city_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  model.associate = (models) => {
    model.hasMany(models.theatre, { foreignKey: 'city_id' });
  };

  return model;
};
