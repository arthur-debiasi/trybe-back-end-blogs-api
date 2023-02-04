const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      underscored: true,
      tableName: 'users',
      timestamps: false,
      defaultScope: {
        attributes: { exclude: ['password'] },
      }
    }
  );

  User.associate = (models) => {
    User.hasMany(models.BlogPost, { foreignKey: 'userId', as: 'categories' });
  };

  return User;
};

module.exports = User;
