module.exports = (queryInterface, DataTypes) => {
  const model = queryInterface.define(
    'movie',
    {
      movie_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      movie_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

  model.associate = (models) => {
    model.hasMany(models.show, { foreignKey: 'movie_id' });

    model.belongsToMany(models.theatre, { through: models.show });
  };

  return model;
};
