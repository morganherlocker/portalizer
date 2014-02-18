portalizer
==========

##a tool for finding data portals


Portalizer scrapes the web for a set of user-specified data portals. It then uses ML to determine whether or not a link is likely a true dataportal. The recommendation of whether or not a link is a true portal is determined using a trained bayesian classifier.

###Use

Clone this repo and cd inside

```bash
git clone https://github.com/morganherlocker/portalizer.git
cd polarizer
```

Next setup a csv file with a list of locations. In this repo, there is states.csv. This could be pointed to cities, countries, counties, etc.

Search the web for the top search results for data portals associated with each location:

```bash
node gatherPortals
```

Now you can run the links through the classifier:

```bash
node classifyPortals
```

This will output a csv file with links, descriptions and whether or not the link likely leads to a portal.

If you were to perform this on a set of locations, then went back and made corrections as needed, the corrected items could be added to portalsTraining.csv, which would make the classifier more accurate in the future.