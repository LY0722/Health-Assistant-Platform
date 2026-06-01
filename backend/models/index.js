const { Sequelize } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  define: dbConfig.define
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// 导入所有模型
db.User = require('./user.model')(sequelize, Sequelize);
db.Article = require('./article.model')(sequelize, Sequelize);
db.ArticleFavorite = require('./article_favorite.model')(sequelize, Sequelize);
db.Assessment = require('./assessment.model')(sequelize, Sequelize);
db.AssessmentHistory = require('./assessment_history.model')(sequelize, Sequelize);
db.BloodPressure = require('./blood_pressure.model')(sequelize, Sequelize);
db.BloodSugar = require('./blood_sugar.model')(sequelize, Sequelize);
db.Cart = require('./cart.model')(sequelize, Sequelize);
db.DiabetesRecord = require('./diabetes_record.model')(sequelize, Sequelize);
db.Doctor = require('./doctor.model')(sequelize, Sequelize);
db.DoctorReview = require('./doctor_review.model')(sequelize, Sequelize);
db.FamilyMember = require('./family_member.model')(sequelize, Sequelize);
db.HealthProfile = require('./health_profile.model')(sequelize, Sequelize);
db.HypertensionRecord = require('./hypertension_record.model')(sequelize, Sequelize);
db.MentalAssessment = require('./mental_assessment.model')(sequelize, Sequelize);
db.Notification = require('./notification.model')(sequelize, Sequelize);
db.Order = require('./order.model')(sequelize, Sequelize);
db.OrderItem = require('./order_item.model')(sequelize, Sequelize);
db.PediatricsGrowth = require('./pediatrics_growth.model')(sequelize, Sequelize);
db.Product = require('./product.model')(sequelize, Sequelize);
db.ProductCategory = require('./product_category.model')(sequelize, Sequelize);
db.ProductImage = require('./product_image.model')(sequelize, Sequelize);
db.RightsExchange = require('./rights_exchange.model')(sequelize, Sequelize);
db.ServiceRecord = require('./service_record.model')(sequelize, Sequelize);
db.StepRecord = require('./step_record.model')(sequelize, Sequelize);
db.UserRights = require('./user_rights.model')(sequelize, Sequelize);
db.WeightRecord = require('./weight_record.model')(sequelize, Sequelize);

// 建立模型关联关系
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;