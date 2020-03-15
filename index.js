var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("test.db");

db.serialize(function() {
  console.log("serialize");
  db.run("CREATE TABLE IF NOT EXISTS COM_USER (user_id TEXT, user_name Text)");

  var stmt = db.prepare("INSERT INTO COM_USER VALUES (?, ?)");
  for (var i = 0; i < 10; i++) {
    stmt.run("ID-" + i, "NAME-" + i);
  }
  stmt.finalize();

  db.each("SELECT user_id, user_name FROM COM_USER", function(err, row) {
    console.log(row.user_id + ": " + row.user_name);
  });
});

db.close();
