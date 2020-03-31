/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('stock', {
		idstock: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
		qty: {
			type: "DOUBLE",
			allowNull: true
		},
		allsale: {
			type: "DOUBLE",
			allowNull: true
		},
		retail: {
			type: "DOUBLE",
			allowNull: true
		},
		discount: {
			type: "DOUBLE",
			allowNull: true
		},
		disrate: {
			type: "DOUBLE",
			allowNull: true
		},
		m_date: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		ex_date: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		has_discount: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		other: {
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
		tableName: 'stock'
	});
};
