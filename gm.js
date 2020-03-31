var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('coopshop', 'root', 'root');

auto.run(function (err) {
    if (err) throw err;
    console.log(auto.tables); // table list
    console.log(auto.foreignKeys); // foreign key list
});


var auto = new SequelizeAuto('coopshop', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    directory: false, // prevents the program from writing to disk
    port: '3306',
    additional: {
        timestamps: true
        //...
    },
   // tables: ['unique', 'steps', 'user']
    //...
})
