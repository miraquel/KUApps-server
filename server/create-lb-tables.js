var server = require('./server');
    var ds = server.dataSources.dbkuapps;
    var lbTables = [
      'CatinPria',
      'CatinWanita'
    ];
    ds.automigrate(lbTables, function(er) {
        if (er) throw er;
        console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
        ds.disconnect();
    });
