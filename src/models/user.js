export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    some_count_field: DataTypes.VIRTUAL(DataTypes.DATE),
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    updatedAt: false,
  });

  User.associate = () => { };
  User.loadScopes = () => {
    User.addScope('fullIncludes', {
      attributes: {
        include: [
          sequelize.literal('NOW() as some_count_field'),
        ],
      },
    });
  };

  return User;
};
