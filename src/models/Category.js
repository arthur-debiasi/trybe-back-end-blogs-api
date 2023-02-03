const User = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
  },
  {
    underscored: true,
    // tableName: 'categories',
    timestamps: false
});
}

module.exports = User
