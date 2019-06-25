const col_stg = (sequelize, DataTypes) => {
  const Col_stg = sequelize.define('col_stg', {
      subjectid: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      recordid: {
        type: DataTypes.STRING,
      },
      col_stg: {
        type: DataTypes.STRING,
      },
      col_stg_std: {
        type: DataTypes.STRING,
      },

    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  // User.associate = models => {
  //   User.hasMany(models.Message, { onDelete: 'CASCADE' });
  // };

  // User.findByLogin = async login => {
  // 	let user = await User.findOne({
  // 		where: { username: login },
  // 	});

  // 	if (!user) {
  // 		user = await User.findOne({
  // 			where: { email: login },
  // 		});
  // 	}

  //   return user;
  // };

  return Col_stg;
};

export default col_stg;