/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		idcomment: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		other: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		product_idproduct: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'product',
				key: 'idproduct'
			}
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
		tableName: 'comment'
	});
};
