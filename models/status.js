/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('status', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status_int: {
			type: DataTypes.INTEGER(255),
			allowNull: true
		}
	}, {
		tableName: 'status'
	});
};
