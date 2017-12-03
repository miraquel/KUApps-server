'use strict';
var CONTAINERS_URL = '/api/Attachments/';
var CONTAINERS = 'slip_setoran';

module.exports = function(Catinpria) {

  // Catinpria.beforeRemote('create', function(ctx, options, cb, next) {
  //   if(!options) options = {};
  //   ctx.req.params.Attachment = 'common';
  //   Catinpria.app.models.Attachment.upload(CONTAINERS,ctx.req,ctx.result,function (err,fileObj) {
  //     if(err) {
  //       cb(err);
  //     } else {
  //       // cb(err,fileObj.files[""][0]);
  //       var fileInfo = fileObj.files[""][0];
  //       Catinpria.updateAttribute(
  //         { url: CONTAINERS_URL+fileInfo.container+'/download/'+fileInfo.name },
  //         function (err,obj) {
  //         if (err !== null) {
  //           cb(err);
  //         } else {
  //           cb(null, obj);
  //         }
  //       });
  //     }
  //   });
  //   next();
  // });

};
