/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('city', {
		idcity: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		city_sinhala: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		city_english: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		city_status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		distric_iddistric: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'distric',
				key: 'iddistric'
			}
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		drate_iddrate: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		tableName: 'city'
	});
};
