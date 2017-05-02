var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
  teamName: { type: String, required: true, unique: true },
    projectName: String,
    members:  [Schema.Types.Mixed],
    rating: Number
});

var Team = mongoose.model('Team', teamSchema);
module.exports = Team;
