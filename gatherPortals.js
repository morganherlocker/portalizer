var _ = require('lodash'),
    async = require('async'),
    csv = require('csv'),
    fs = require('fs'),
    classifier = require('classifier'),
    google = require('google');

var portals = 'Location, Link, Title, Description',
    locationFile = './states.csv',
    outputFile = './portals.csv'

console.log('Gathering Locations')
csv()
.from.path(locationFile)
.to.array(function(locations){
  async.eachSeries(locations,
    function(location, cb){
      console.log('=================')
      console.log('Location: '+location[0])
      getPortal(location[0], cb)
    },
    function(){
      fs.writeFileSync(outputFile, portals)
      console.log('Complete')
    }
  )
})

function getPortal(name, done){
  google.resultsPerPage = 10;
  var nextCounter = 0;

  google(name + ' data portal', function(err, next, links){
    if (err) console.error(err);
    for (var i = 0; i < links.length; ++i) {
      console.log(links[i].title + ' - ' + links[i].link); //link.href is an alias for link.link
      console.log(links[i].description + "\n");
      portals += '\n"'+name+'",'
      portals += '"'+links[i].link+'",'
      portals += '"'+links[i].title+'",'
      portals += '"'+links[i].description.split('"').join('')+'"'
    }
    done()
  });
}
