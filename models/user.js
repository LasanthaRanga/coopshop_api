/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		iduser: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		pword: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		mobile: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		branch: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		member: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		gender: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		isactive: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		rating: {
			type: "DOUBLE",
			allowNull: true
		},
		nic: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		other1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		other2: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		utype_idutype: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'utype',
				key: 'idutype'
			}
		},
		bussynes: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		nature: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		tp: {
			type: DataTypes.STRING(255),
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
		tableName: 'user'
	});
};
