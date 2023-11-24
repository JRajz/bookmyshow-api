module.exports = (queryInterface, DataTypes) => {
  const model = queryInterface.define(
    'show',
    {
      show_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      movie_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      theatre_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      screen_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      show_datetime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  model.associate = (models) => {
    model.belongsTo(models.theatre, { foreignKey: 'theatre_id' });
    model.belongsTo(models.movie, { foreignKey: 'movie_id' });
    model.belongsTo(models.screen, { foreignKey: 'screen_id' });
  };

  return model;
};
