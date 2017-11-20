/**
 * SnippetController
 *
 * @description :: Server-side logic for managing snippets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  snipity : function(options , cb) {
		sails.log(options.id)
    Snippet.findOne({id : options.id}).exec(function (err , snippet) {
			if(err) {return err	}
      if (!snippet) { return new Error("Snippet not found") };
      return snippet
    })
  },
  count: function(request, response) {
      var Model = actionUtil.parseModel(request);

      Model
          .count(actionUtil.parseCriteria(request))
          .exec(function found(err, count) {
              response.json({count: count});
          });
  }
};
