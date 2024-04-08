const db = require("../config/database");

class Model{
  executeQuery = async (sql, params) => {
    const response = await db.promise().query(sql, params);
  
    return response[0];
  };
  
  GetAll = async (table) => {
    const query = `SELECT * FROM ${table}`;
    return await executeQuery(query);
  };
  
  GetSingle = async (table, key, value) => {
    const query = `SELECT * FROM ${table} WHERE ${key} = ?`;
    return await executeQuery(query, [value]);
  };
  
  Delete = async (table, id) => {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    return await executeQuery(query, [id]);
  };
  
  Add = async (table, MappedObject) => {
    const query = `INSERT INTO ${table} (${Object.keys(
      MappedObject
    ).toString()}) values (${"?,".repeat(
      Object.keys(MappedObject).length - 1
    )} ?)`;
    return await executeQuery(query, Object.values(MappedObject));
  };
  
  Edit = async (table, id, MappedObject) => {
    const MappedArray = Object.keys(MappedObject).map((el) => {
      return el + " = ? ";
    });
  
    const query = `UPDATE ${table} SET ${MappedArray} where id = ?`;
  
    const params = [...Object.values(MappedObject), id];
    return await executeQuery(query, params);
  };
};


module.exports = Model;
