var ObjectID = require('mongodb').ObjectID;

// routes/sakernas_routes.js
module.exports = function(app, db) {
  // AKSES COLLECTIONS
  app.get('/petugas-lap/all', (req, res) => {
    const note = db.collection('petugas_lap').find({}).toArray(function(err, result) {
      // const note = db.collection('master_kab').find({"kode_prov" : {$regex : ".*00.*"}}, {_id: 0, kode_prov: 1, kode_kab: 1, nama_kab: 1}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/nks', (req, res) => {
    const note = db.collection('master_nks').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/approval', (req, res) => {
    const note = db.collection('approval').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/data-art', (req, res) => {
    const note = db.collection('data_art').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/data-rt/all', (req, res) => {
    const note = db.collection('data_rt').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

        app.get('/data-rt', (req, res) => {
          var entri_p_kab = req.query['kode_kab'];
          var entri_p_prov = req.query['kode_prov'];
          var entri_p_sem = req.query['semester'];
          var entri_p_kec = req.query['kode_kec'];
          var entri_p_desa = req.query['kode_desa'];
          var entri_p_nks = req.query['nks'];

          //--- tentukan berapa jumlah parameter request, apakah 3 atau 6
          var temp = {};
          if (typeof entri_p_sem == 'undefined')
              temp = {
                "kode_prov":entri_p_prov,
                "kode_kab":entri_p_kab
              }
          else if (typeof entri_p_kec == 'undefined')
              temp = {
                "semester":entri_p_sem,
                "kode_prov":entri_p_prov,
                "kode_kab":entri_p_kab
              }
          else
              temp = {
                "semester":entri_p_sem,
                "kode_prov":entri_p_prov,
                "kode_kab":entri_p_kab,
                "kode_kec":entri_p_kec,
                "kode_desa":entri_p_desa,
                "nks":entri_p_nks
              }

          const note = db.collection('data_rt').find(temp).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
          });
        });

  app.get('/kbji', (req, res) => {
    const note = db.collection('kbji').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/kbli', (req, res) => {
    const note = db.collection('kbli').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/dsrt', (req, res) => {
    var dsrt_sem = req.query.dsrt_sem;
    var dsrt_prov = req.query.dsrt_prov;
    var dsrt_kab = req.query.dsrt_kab;
    var dsrt_kec = req.query.dsrt_kec;
    var dsrt_desa = req.query.dsrt_desa;
    var dsrt_nbsnks = req.query.dsrt_nbsnks;

    var temp = {
      "semester":dsrt_sem,
      "kode_prov":dsrt_prov,
      "kode_kab":dsrt_kab,
      "KEC":dsrt_kec,
      "DESA":dsrt_desa
      //"nks":dsrt_nks //belum fix
    };

    const note = db.collection('dsrt').find(temp).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/pemutakhiran/all', (req, res) => {
    const note = db.collection('pemutakhiran').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

        app.get('/pemutakhiran', (req, res) => {
          var entri_p_kab = req.query['kode_kab'];
          var entri_p_prov = req.query['kode_prov'];
          var entri_p_sem = req.query['semester'];
          var entri_p_kec = req.query['kode_kec'];
          var entri_p_desa = req.query['kode_desa'];
          var entri_p_nks = req.query['nks'];

          // console.log("req.query: "+ JSON.stringify(req.query));

          //--- tentukan berapa jumlah parameter request, apakah 3 atau 6
          var temp = {};
          if (typeof entri_p_sem == 'undefined')
              temp = {
                "kode_prov":entri_p_prov,
                "kode_kab":entri_p_kab
              }
          else if (typeof entri_p_kec == 'undefined')
              temp = {
                "semester":entri_p_sem,
                "kode_prov":entri_p_prov,
                "kode_kab":entri_p_kab
              }
          else
              temp = {
                "semester":entri_p_sem,
                "kode_prov":entri_p_prov,
                "kode_kab":entri_p_kab,
                "kode_kec":entri_p_kec,
                "kode_desa":entri_p_desa,
                "nks":entri_p_nks
              }

          // console.log('temp: '+JSON.stringify(temp));
          // var keys = Object.keys(req.query);

          const note = db.collection('pemutakhiran').find(temp).toArray(function(err, result) {
            if (err) throw err;
            // console.log("res: "+JSON.stringify(result));
            res.json(result);
          });
        });

        app.get('/pemutakhiran/:id', (req,res) => {

          var _id = new ObjectID(req.params.id);
          var temp = {
            _id: _id
          }

          const note = db.collection('pemutakhiran').findOne(temp, function(err, result) {
            if (err) throw err;
            console.log("res: "+JSON.stringify(result));
            res.json(result);
          });

        });

        app.post('/pemutakhiran/add', (req, res) => {

          console.log('CREATE: ');
          console.log(JSON.stringify(req.body));

          var temp = req.body;

          const note = db.collection('pemutakhiran').insert(temp, function(err, result) {
            if (err) throw err;
            console.log("res: "+JSON.stringify(result));
            res.json(result);
          });

        });

        app.put('/pemutakhiran/update/:id', (req, res) => {


          var temp = {
            _id: new ObjectID(req.params.id)
          };
          console.log('UPDATE: ');
          console.log(JSON.stringify(temp));
          console.log(JSON.stringify(req.body));
          var data = {
            $set:
              req.body

          };

          const note = db.collection('pemutakhiran').updateOne(temp, data, function(err, result) {
            if (err) throw {"error": err};
            res.json(result);

            console.log({
              "res": JSON.stringify(result)
            });
          });

        });//*/

    app.post('/check-user-avail', (req, res) => {
        var username = req.body.username;

        var temp = {
            "username":username
          }
        // console.log(JSON.stringify(temp));

        const note = db.collection('user').find(temp).toArray(function(err, result) {
          if (err) throw err;
          // console.log(result);
          res.json(result);
        });
      });

    app.post('/login', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;

      var temp = {
          "username":username,
          "password":password
        };

      // console.log(JSON.stringify(temp));

      const note = db.collection('user').find(temp).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        if (result.length == 0)
            res.json({registered: false});
        else
            res.json({registered: true});
      });
    });

    app.post('/register', (req, res) => {
      var username = req.body.username;
      var password = req.body.password;

      var temp = {
          "id_user":'',
          "kode_prov":'',
          "kode_kab":'',
          "username":username,
          "password":password,
          "realname":'',
          "userlevel":''
        };

      // console.log(JSON.stringify(temp));

      const note = db.collection('user').insert(temp, function(err, result) {
          if (err) throw err;
      });
    });

  app.get('/petugas-lap', (req, res) => {
    var petugas_lap_sem = req.query.petugas_lap_sem;
    var petugas_lap_prov = req.query.petugas_lap_prov;
    var petugas_lap_kab = req.query.petugas_lap_kab;

    //console.log(petugas_lap_sem);

    var temp = {
      "semester":petugas_lap_sem,
      "kode_prov":petugas_lap_prov,
      "kode_kab":petugas_lap_kab
    };

    //console.log(temp);

    const note = db.collection('petugas_lap').find(temp).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

        app.post('/petugas-lap/add', (req, res) => {
          if (!req.body) return res.sendStatus(400);

          var semester = req.body.add_petugas_sem;
          var kode_prov = req.body.add_petugas_prov;
          var kode_kab = req.body.add_petugas_kab;
          var kode_petugas = req.body.add_petugas_kodepetugas;
          var jenis_petugas = '1';
          var nama = req.body.add_petugas_namapetugas;
          var jabatan_petugas = req.body.add_petugas_status;
          var no_telp = req.body.add_petugas_telp;

          var temp = {
            "semester":semester,
            "kode_prov":kode_prov,
            "kode_kab":kode_kab,
            "kode_petugas":kode_petugas,
            "jenis_petugas":jenis_petugas,
            "nama":nama,
            "jabatan_petugas":jabatan_petugas,
            "no_telp":no_telp
          };

          const note = db.collection('petugas_lap').insert(temp, function(err, result) {
              if (err) throw err;
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
