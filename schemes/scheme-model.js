//write the db helper methods for the `schemes` resource in `./schemes/scheme-model.js`

const db = require('../data/db-config.js')

module.exports = {
    find,
    findById,
    update,
    remove,
    add,
    findSteps
}

//find
function find(){
    return db('schemes')
}

//findById
function findById(id){
    return db('schemes')
    .where({id})
    .first()
}

//findSteps(id)
function findSteps(id) {
    return db("steps")
      .join("schemes", "steps.scheme_id", "schemes.id")
      .select(
        "steps.id",
        "steps.step_number",
        "schemes.scheme_name",
        "steps.instructions"
      )
      .orderBy("steps.step_number")
      .where({ "steps.scheme_id": id });
  }

//add(scheme)
function add(scheme) {
    return db("schemes")
      .insert(scheme)
      .then(ids => {
        return { id: ids[0] };
      });
  }

//update(changes,id)
function update(changes,id){
    return db('schemes')
    .where({id})
    .update(changes)
}

//remove(id)
function remove(id){
    return db('schemes')
    .where({ id })
    .del()
}