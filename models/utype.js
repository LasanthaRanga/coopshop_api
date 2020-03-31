/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('utype', {
		idutype: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type_name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		type_code: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		type_status: {
			type: DataTypes.STRING(45),
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
		tableName: 'utype'
	});
};
