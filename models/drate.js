/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('drate', {
		iddrate: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		firstkg: {
			type: "DOUBLE",
			allowNull: true
		},
		addkg: {
			type: "DOUBLE",
			allowNull: true
		}
	}, {
		tableName: 'drate'
	});
};
