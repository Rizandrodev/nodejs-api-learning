class NotImplemntedException extends Error {
  constructor() {
    super("Not Implemnted Exception")
  }
}

class Icrud { //simulacao de Interface 
  create(item) {
    throw new NotImplemntedException()
  }
  read(query) {
    throw new NotImplemntedException()
  }
  update(id, item) {
    throw new NotImplemntedException()
  }
  delete(id) {
    throw new NotImplemntedException()
  } 
  isConnected() {
    throw new NotImplemntedException()
  }
}

module.exports=Icrud