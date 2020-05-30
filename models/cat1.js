/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cat1', {
		idcat1: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cat: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		cat_sinhala: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		rate: {
			type: "DOUBLE",
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
		tableName: 'cat1'
	});
};
