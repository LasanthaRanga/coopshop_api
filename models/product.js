/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('product', {
		idproduct: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		code: {
			type: DataTypes.STRING(45),
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
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		others: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		rating: {
			type: "DOUBLE",
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
		cat1_idcat1: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'cat1',
				key: 'idcat1'
			}
		},
		cat2_idcat2: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'cat2',
				key: 'idcat2'
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
		tableName: 'product'
	});
};
