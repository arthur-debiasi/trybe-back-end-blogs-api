module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    published:{
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated:{
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    underscored: true,
    // tableName: 'categories',
    timestamps: false
});

BlogPost.associate = (models) => {
  BlogPost.belongsTo(models.User,
     { foreignKey: 'userId', as: 'users' });
 };

 return BlogPost;
}