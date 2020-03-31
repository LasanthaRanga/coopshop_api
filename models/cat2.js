/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cat2', {
		idcat2: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		cat2: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		cat1_idcat1: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: {
				model: 'cat1',
				key: 'idcat1'
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
		tableName: 'cat2'
	});
};
