function attachOnExitListener(db) {
    process.on('SIGINT', () => {
      db.destroy().then(() => {
        console.log('Database pool closed. Exiting.');
        process.exit(0);
      });
    });
  
    process.on('SIGTERM', () => {
      db.destroy().then(() => {
        console.log('Database pool closed. Exiting.');
        process.exit(0);
      });
    });
  }
  
  module.exports = { attachOnExitListener };
  