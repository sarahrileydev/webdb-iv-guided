exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("tracks", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();

      //create all tables in one file by chaining below
    })
    .createTable("cohorts", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();

      tbl
        .integer("track_id")
        .unsigned()
        .references("id")
        .inTable("tracks")
        .onDelete("CASCADE") //cascade makes sure to keep relationships between tables in sync
        .onUpdate("CASCADE");
    })
    .createTable("students", tbl => {
      tbl.increments();

      tbl
        .string("name", 128)
        .notNullable()
        .unique();
    })
    .createTable("cohorts_students", tbl => {
      //the students and cohorts tables must be created first
      tbl.increments();

      tbl
        .integer("cohort_id")
        .unsigned()
        .references("id")
        .inTable("cohorts")
        .onDelete("CASCADE") //cascade makes sure to keep relationships between tables in sync
        .onUpdate("CASCADE");

      tbl
        .integer("student_id")
        .unsigned()
        .references("id")
        .inTable("students")
        .onDelete("CASCADE") //cascade makes sure to keep relationships between tables in sync
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex, Promise) {
  //tables with foreign key must be removed before the first table is removed
  return knex.schema
    .dropTableIfExists("cohorts_students")
    .dropTableIfExists("students")
    .dropTableIfExists("cohorts")
    .dropTableIfExists("tracks");
};
