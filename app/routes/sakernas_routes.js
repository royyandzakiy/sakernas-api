var ObjectID = require('mongodb').ObjectID;

// routes/sakernas_routes.js
module.exports = function(app, db) {
  // AKSES COLLECTIONS
  app.get('/approval', (req, res) => {
    const note = db.collection('approval').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/data-art', (req, res) => {
    const note = db.collection('data_art').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/data-rt', (req, res) => {
    const note = db.collection('data_rt').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/kbji', (req, res) => {
    const note = db.collection('kbji').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/kbli', (req, res) => {
    const note = db.collection('kbli').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/pemutakhiran', (req, res) => {
    var entri_p_sem = req.query.entri_p_sem;
    var entri_p_prov = req.query.entri_p_prov;
    var entri_p_kab = req.query.entri_p_kab;

    const note = db.collection('pemutakhiran').find({"semester":entri_p_sem, "kode_prov":entri_p_prov, "kode_kab":entri_p_kab}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/dsrt', (req, res) => {
    const note = db.collection('dsrt').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/petugas-lap', (req, res) => {
    const note = db.collection('petugas_lap').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/user', (req, res) => {
    const note = db.collection('user').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/master-nks', (req, res) => {
    const note = db.collection('master_nks').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/master-kab', (req, res) => {
    const note = db.collection('master_kab').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/master-prov', (req, res) => {
    const note = db.collection('master_prov').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/master-kec', (req, res) => {
    const note = db.collection('master_kec').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/master-desa', (req, res) => {
    const note = db.collection('master_desa').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

          // --------------DUMMY
          app.get('/notes', (req, res) => {
            const note = db.collection('notes').find({}).toArray(function(err, result) {
            // const note = db.collection('notes').findOne({}, {_id: 0, text: 1, title: 1}, function(err, result) {
              if (err) throw err;
              res.json(result);
            });
          });

          // CREATE
          app.post('/notes', (req, res) => {
            const note = { text: req.body.body, title: req.body.title };
            db.collection('notes').insert(note, (err, result) => {
              if (err) {
                res.send({ 'error': 'An error has occurred' });
              } else {
                // Create note
                console.log(result.ops[0]);
                res.send(result.ops[0]);
              }
            });
          });

          // READ
          app.get('/notes/:id', (req, res) => {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };
            db.collection('notes').findOne(details, (err, item) => {
              if (err) {
                res.send({'error': 'An error has occurred'});
              } else {
                res.send(item);
              }
            });
          });

          // UPDATE
          app.put('/notes/:id', (req, res) => {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };
            const note = { text: req.body.body, title: req.body.title };
            db.collection('notes').update(details, note, (err, result) => {
              if (err) {
                res.send({ 'error': 'An error occurred'});
              } else {
                res.send(note);
              }
            });
          });

          // DELETE
          app.delete('/notes/:id', (req, res) => {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };
            db.collection('notes').remove(details, (err, item) => {
              if (err) {
                res.send({'error': 'An error has occurred'});
              } else {
                res.send('Note ' + id + ' deleted!');
              }
            });
          });
          //*/
};
