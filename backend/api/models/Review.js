/**
 * Review.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id: {
    	type: 'integer',
    	autoIncrement: true,
      unique: true,
      primaryKey: true,
  	},
  	code : "text" ,
  	description : "text" ,
  	rating : "integer",
    user : "json",
    snippet: {
      model: 'snippet'
    },
    poster:{
      model: 'user'
    }
  }
};
