var _ = require('lodash'),
    async = require('async'),
    csv = require('csv'),
    fs = require('fs'),
    classifier = require('classifier')

var portalsFile = './portals2.csv',
    trainingFile = './portalsTraining.csv',
    classifiedFile = './classifiedPortals.csv'

var bayes = new classifier.Bayesian();
var classified = []
csv().from.path(portalsFile).to.array(function(portals){
  csv().from.path(trainingFile).to.array(function(trainingPortals){
    _.each(trainingPortals, function(trainPortal, i){
      if(i > 0){
        bayes.train(trainPortal[2] + ' ' + trainPortal[3], trainPortal[4])
      }
    })

    _.each(portals, function(portal, i){
      if(i > 0){
        console.log('============')
        console.log(portal[0])
        var isPortal = bayes.classify(portal[2]+' '+portal[3])
        console.log(isPortal)
        portal.push(isPortal)
        classified.push(portal)
      }
    })
    //console.log(classified)
    saveOutput(classified)
  })
})

function saveOutput(portals){
  portalsCsv = 'Location, Link, Title, Description, isPortal'
  _.each(portals, function(portal){
    console.log(portal[4])
    portalsCsv += '\n"'+portal[0]+'", '
    portalsCsv += '"'+portal[1]+'", '
    portalsCsv += '"'+portal[2]+'", '
    portalsCsv += '"'+portal[3]+'", '
    portalsCsv += '"'+portal[4]+'" '
  })
  fs.writeFileSync(classifiedFile, portalsCsv)
}