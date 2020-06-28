/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('distric', {
		iddistric: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		distric_sinhala: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		distric_english: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		distric_status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'distric'
	});
};
