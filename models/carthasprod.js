/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('carthasprod', {
		idCarthasprod: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cartid: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'cart',
				key: 'idcart'
			}
		},
		prodid: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			references: {
				model: 'product',
				key: 'idproduct'
			}
		},
		qty: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		oneprice: {
			type: "DOUBLE",
			allowNull: true
		},
		allprice: {
			type: "DOUBLE",
			allowNull: true
		},
		diliverstatus: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		diliverstatusstring: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'carthasprod'
	});
};
