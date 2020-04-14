/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('privilages', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		icon: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		utype: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'utype',
				key: 'idutype'
			}
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
		tableName: 'privilages'
	});
};
