var mysql = require('mysql2');

var pool = mysql.createPool({
  host: "164.132.40.57",
  user: "root",
  port: 3307,
  password: "secret",
  database: "plate_recognition"
});


var DB = (function () {
    function _query(query, params, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                if(connection)connection.release();
                callback(null, err);
                throw err;
            }

            if(connection)connection.query(query, params, function (err, rows) {
                if(connection)connection.release();
                if (!err) {
                    callback(rows);
                }
                else {
                    callback(null, err);
                }

            });

            if(connection)connection.on('error', function (err) {
                if(connection)connection.release();
                callback(null, err);
                throw err;
            });
        });
    };
    return {
        query: _query
    };
})();

module.exports = DB;