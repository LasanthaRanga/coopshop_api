/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cart', {
		idcart: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		user_iduser: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'user',
				key: 'iduser'
			}
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		statusstring: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		total: {
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
		tableName: 'cart'
	});
};
