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

  app.get('/data-art/all', (req, res) => {
    const note = db.collection('data_art').find({}).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  });

        app.get('/data-art', (req, res) => {
          const query = {
            semester: req.query['semester'],
            kode_prov: req.query['kode_prov'],
            kode_kab: req.query['kode_kab'],
          };

          // console.log(JSON.stringify(query));

          const send = db.collection('data_art').find(query).toArray(function(err, result) {
            if (err) throw err;
            // console.log(JSON.stringify(result));
            // console.log('result.length: ');
            // console.log(result.length);

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
                // "kode_kec":entri_p_kec,
                // "kode_desa":entri_p_desa,
                // "nks":entri_p_nks
              }

          const note = db.collection('dsrt').find(temp).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
          });
        });

        app.get('/data-rt-monitor', (req, res) => {
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
                // "kode_kec":entri_p_kec,
                // "kode_desa":entri_p_desa,
                // "nks":entri_p_nks
              }

          const note = db.collection('data_rt').find(temp).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
          });
        });

  app.get('/ruta', (req, res) => {
    // cari Dsrt
    // cari data_rt & data_art yg sesuai
    temp = {
      "semester":req.query['semester'],
      "kode_prov":req.query['kode_prov'],
      "kode_kab":req.query['kode_kab'],
      "KEC":req.query['KEC'],
      "DESA":req.query['DESA'],
      "nks":req.query['nks'],
    }

    const send = db.collection('dsrt').find(temp).toArray(function(err, dsrt) {
      if (err) throw err;
      console.log("dsrt: "+JSON.stringify(dsrt));

      const send2 = db.collection('data_rt').find({}).toArray(function(err, data_rt) {
        if (err) throw err;
        console.log("data_rt: "+JSON.stringify(data_rt));

        const send3 = db.collection('data_art').find({}).toArray(function(err, data_art) {
          if (err) throw err;
          console.log("data_art: "+JSON.stringify(data_art));

          var temp = {
            dsrt : dsrt,
            data_rt : data_rt,
            data_art : data_art
          };

          console.log("data all: "+JSON.stringify(temp));
          res.json(temp);
        });
      });
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
    var dsrt_nks = req.query.dsrt_nks;

    var temp = {
      "semester":dsrt_sem,
      "kode_prov":dsrt_prov,
      "kode_kab":dsrt_kab,
      "KEC":dsrt_kec,
      "DESA":dsrt_desa,
      "nks":dsrt_nks
    };

    console.log(JSON.stringify(temp));

    const note = db.collection('dsrt').find(temp).toArray(function(err, result) {
      if (err) throw err;
      res.json(result);
      console.log(JSON.stringify(result));
    });
  });

        app.get('/dsrt/all', (req, res) => {

          const note = db.collection('dsrt').find({}).toArray(function(err, result) {
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

          console.log("req.query: "+ JSON.stringify(req.query));

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
        if (result.length == 0) {
            result[0].registered = false;
        } else {
            result[0].registered = true;
        }
        console.log(result);
        res.json(result);
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

        app.get('/petugas-lap/all', (req, res) => {

          const note = db.collection('petugas_lap').find({}).toArray(function(err, result) {
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

        app.put('/petugas-lap/update:id', (req, res) => {
          if (!req.body) return res.sendStatus(400);
          const temp = { '_id': new ObjectID(req.params.id) };

          console.log(_id);

          var semester = req.body.edit_petugas_sem;
          var kode_prov = req.body.edit_petugas_prov;
          var kode_kab = req.body.edit_petugas_kab;
          var kode_petugas = req.body.edit_petugas_kodepetugas;
          var jenis_petugas = req.body.edit_petugas_jenis;
          var nama = req.body.edit_petugas_namapetugas;
          var jabatan_petugas = req.body.edit_petugas_status;
          var no_telp = req.body.edit_petugas_telp;

          var data = {
            "semester":semester,
            "kode_prov":kode_prov,
            "kode_kab":kode_kab,
            "kode_petugas":kode_petugas,
            "jenis_petugas":jenis_petugas,
            "nama":nama,
            "jabatan_petugas":jabatan_petugas,
            "no_telp":no_telp
          };

          console.log(JSON.stringify(data));

          const note = db.collection('petugas_lap').updateOne(temp, data, function(err, result) {
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

        app.get('/user/:id', (req, res) => {
          const id = req.params.id;
          const details = { '_id': new ObjectID(id) };
          db.collection('user').findOne(details, (err, item) => {
            if (err) {
              res.send({'error': 'An error has occurred'});
            } else {
              res.send(item);
              console.log(JSON.stringify(item));
            }
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

  app.get('/revalidasi', (req, res) => {
    const query = {
      semester: req.query['semester'],
      kode_prov: req.query['kode_prov'],
      kode_kab: req.query['kode_kab'],
    };

    const send = db.collection('data_art').find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      console.log('result.length: ');
      console.log(result.length);

      res.json(result);
    });
  })

  app.post('/approval', (req, res) => {
    const query = {
      semester: req.body['semester'],
      kode_prov: req.body['kode_prov'],
      kode_kab: req.body['kode_kab'],
      id_user: req.body['id_user'],
      flag_approval: 1
    };

    const send = db.collection('approval').insert(query, (err, result) => {
      if (err) throw err;
      // console.log(JSON.stringify(result));
      // console.log('result.length: ');
      // console.log(result.length);

      res.json(result);
    });
  })

        app.get('/approval/all', (req, res) => {

          const send = db.collection('approval').find({}).toArray((err, result) => {
            if (err) throw err;

            res.json(result);
          });
        })

  app.get('/cek-kewajaran', (req, res) => {
    const query = {
      semester: req.query['semester'],
      kode_prov: req.query['kode_prov'],
      kode_kab: req.query['kode_kab'],
    };

    var totalData = 0;

    var data ={
    totalData:0,
    totalDataL:0,
    totalDataP:0,
    kategori:[
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},

      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},

      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0},
      {total:0,totalL:0,totalP:0}
    ]};

    // console.log(JSON.stringify(query));

    const send = db.collection('data_art').find(query).toArray(function(err, result) {
      if (err) throw err;
      console.log('result.length: ');
      console.log(result.length);
      for (var i=0; i<result.length; i++) {
        var kategori = result[i]['b4_k6'] / 5;
        kategori = Math.floor(kategori); //dapetin kategori (sebagai urutan data)
        if(kategori > 11)
          kategori=12;
        console.log("i: "+i+", kategori: "+kategori+", usia: "+result[i]['b4_k6']);

        data.kategori[kategori].total++;
        if(result[i]['b4_k4'] == '1'){
          data.kategori[kategori].totalL++;
          data.totalDataL++;
        } else if(result[i]['b4_k4'] == '2'){
          data.kategori[kategori].totalP++;
          data.totalDataP++;
        }
        data.totalData++;
      }

      // console.log(JSON.stringify(data));
      // console.log(totalData);

      res.json(data);
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
