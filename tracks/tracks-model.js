const db = require("../data/dbConfig");

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db("tracks");
}

function findById(id) {
  return db("tracks")
    .where({ id })
    .first(); //gets rid of array brackets and makes it a simple object
}

function add(track) {
  return db("tracks").insert(track, "id"); //passing the id as the second parameter is recommended to ensure the id is returned when connecting to other DBMS like Postgres
}

function update(id, changes) {
  return db("tracks")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db("tracks")
    .where({ id })
    .del();
}
