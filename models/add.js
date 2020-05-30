/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('add', {
		id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		url: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		clickurl: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		type: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		position: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		other_int: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		other_string: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		other_double: {
			type: "DOUBLE",
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		isactive: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: true
		}
	}, {
		tableName: 'add'
	});
};
