db = db.getSiblingDB('herois');

db.createUser({
  user: 'riz',
  pwd: 'mycsecretpassword',
  roles: [
    {
      role: 'readWrite',
      db: 'herois'
    }
  ]
});