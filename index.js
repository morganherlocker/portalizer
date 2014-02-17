var _ = require('lodash'),
    async = require('async'),
    csv = require('csv'),
    fs = require('fs'),
    ddg = require('ddg'),
    classifier = require('classifier')

console.log('Gathering Locations')
csv()
.from.path('./states.csv')
.to.array( function(states){
  async.eachSeries(states,
    function(state, cb){
      console.log('=================')
      console.log('State: '+state[0])
      getPortal(state[0], cb)
    },
    function(){
      console.log('Complete')
    }
  )
})

function getPortal(name, done){
  console.log(name)
  ddg.query(name + ' data portal', function(err, data){
    console.log(data)

    done()
  });
}