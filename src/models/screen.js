module.exports = (queryInterface, DataTypes) => {
  const model = queryInterface.define(
    'screen',
    {
      screen_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      screen_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      theatre_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  model.associate = (models) => {
    model.belongsTo(models.theatre, { foreignKey: 'theatre_id' });
  };

  return model;
};
