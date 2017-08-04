var path = require('path');
var async = require('async');

var app = require('./server');
var User = app.models.Admin;
var Role = app.models.MyRole;
var RoleMapping = app.models.MyRoleMapping;
var ACL = app.models.MyACL;

User.create(
  [
    {
      email: "ading.assegaf@gmail.com",
      password: "Skateboars1",
      dob: "2017-06-30T07:34:53.717Z",
      name: "Chaidir Ali Assegaf",
      username: "miraquel"
    },
  ],
  function(err, admins){
    if (err) throw err;

    console.log("Admin created: ",admins);

    async.parallel({
      role:   async.apply(createRole),
      acls:   async.apply(createACLs),
    }, function(err, results){
      if (err) throw err;

      console.log('Done!');
      process.exit(0);
    });

    function createRole(cb){
      Role.create({
        name: 'admin'
      }, function(err, role) {
        if (err) return cb(err);
        console.log(role);

        // Make Bob an admin
      role.principals.create({
          principalType: RoleMapping.USER,
          principalId: admin[0].id
        }, function(err, principal) {
          if (err) return cb(err);
          console.log(principal);

          return cb(null, true);
        });
      });
    }

    function createACLs(cb){
      ACL.create(
        [
          {
            "model":"Admin",
            "accessType": "*",
            "principalType": "ROLE",
            "principalId": "$everyone",
            "permission": "DENY"
          },
          {
            "model":"Admin",
            "accessType": "EXECUTE",
            "principalType": "ROLE",
            "principalId": "$unauthenticated",
            "permission": "ALLOW",
            "property": "post"
          },
          {
            "model":"Admin",
            "accessType": "EXECUTE",
            "principalType": "ROLE",
            "principalId": "$unauthenticated",
            "permission": "ALLOW",
            "property": "login"
          },
          {
            "model":"Admin",
            "accessType": "READ",
            "principalType": "ROLE",
            "principalId": "$authenticated",
            "permission": "ALLOW"
          },
          {
            "model":"Admin",
            "accessType": "WRITE",
            "principalType": "ROLE",
            "principalId": "$admin",
            "permission": "ALLOW"
          }
          ,
          {
            "model":"CatinPria",
            "accessType": ACL.ALL,
            "principalType": ACL.ROLE,
            "principalId": Role.EVERYONE,
            "permission": ACL.DENY
          },
          {
            "model":"CatinPria",
            "accessType": ACL.WRITE,
            "principalType": ACL.ROLE,
            "principalId": Role.AUTHENTICATED,
            "permission": ACL.ALLOW,
            "property": "create"
          },
          {
            "model":"CatinPria",
            "accessType": ACL.WRITE,
            "principalType": ACL.ROLE,
            "principalId": Role.ADMIN,
            "permission": ACL.ALLOW,
            "property": "upsert"
          },
          {
            "model":"CatinPria",
            "accessType": ACL.READ,
            "principalType": ACL.ROLE,
            "principalId": Role.AUTHENTICATED,
            "permission": ACL.ALLOW
          }

        ],
        function(err, acls){
          if (err) return cb(err);
          console.log(acls);

          return cb(null, true);
        });
      }
    }
  );
