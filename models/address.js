/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('address', {
		idaddress: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		line1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		line2: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		line3: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		postal_code: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		country: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		x: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		y: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		isdiliver: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		user_iduser: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'user',
				key: 'iduser'
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
		tableName: 'address'
	});
};
