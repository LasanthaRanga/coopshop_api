/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('prodimage', {
		idprodimage: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		oder: {
			type: DataTypes.INTEGER(11),
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
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		tableName: 'prodimage'
	});
};
