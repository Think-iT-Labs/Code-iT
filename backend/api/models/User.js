var User = {
  // Enforce model schema in the case of schemaless databases
  schema: true,

  attributes: {
    id : {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    username  : { type: 'string', unique: true },
    email     : { type: 'email',  unique: true },
    passports : { collection: 'Passport', via: 'user' },
    reviews : { collection: 'review', via: 'poster'} , 

  }
};

module.exports = User;
