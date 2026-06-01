module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255)
    },
    nickname: {
      type: DataTypes.STRING(50)
    },
    gender: {
      type: DataTypes.ENUM('男', '女', '其他')
    },
    birthday: {
      type: DataTypes.DATEONLY
    }
  }, {
    tableName: 'user',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });

  User.associate = function(models) {
    User.hasMany(models.ArticleFavorite, { foreignKey: 'user_id' });
    User.hasMany(models.Assessment, { foreignKey: 'user_id' });
    User.hasMany(models.BloodPressure, { foreignKey: 'user_id' });
    User.hasMany(models.BloodSugar, { foreignKey: 'user_id' });
    User.hasMany(models.Cart, { foreignKey: 'user_id' });
    User.hasMany(models.DiabetesRecord, { foreignKey: 'user_id' });
    User.hasMany(models.DoctorReview, { foreignKey: 'user_id' });
    User.hasMany(models.FamilyMember, { foreignKey: 'user_id' });
    User.hasOne(models.HealthProfile, { foreignKey: 'user_id' });
    User.hasMany(models.HypertensionRecord, { foreignKey: 'user_id' });
    User.hasMany(models.MentalAssessment, { foreignKey: 'user_id' });
    User.hasMany(models.Notification, { foreignKey: 'user_id' });
    User.hasMany(models.Order, { foreignKey: 'user_id' });
    User.hasMany(models.PediatricsGrowth, { foreignKey: 'user_id' });
    User.hasMany(models.RightsExchange, { foreignKey: 'user_id' });
    User.hasMany(models.ServiceRecord, { foreignKey: 'user_id' });
    User.hasMany(models.StepRecord, { foreignKey: 'user_id' });
    User.hasOne(models.UserRights, { foreignKey: 'user_id' });
    User.hasMany(models.WeightRecord, { foreignKey: 'user_id' });
  };

  return User;
};