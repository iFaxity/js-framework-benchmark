var _ = require('lodash');
var exec = require('child_process').execSync;
var fs = require('fs');
var path = require('path');
var yargs = require('yargs');

/*
The restart parameter can be used to rebuily only some of the frameworks.
One can either rebuild alll frameworks where the parameter matches the prefix of a 
framework name, no matter if keyed or non-keyed:
--restartWith angu 
(Matches keyed and non-keyed angular, angularjs, angular-ivy, ...)
Or it can be restrict matching to keyed or non-keyed frameworks:
--restartWith keyed/angu
(Matches only keyed angular, angularjs, angular-ivy, ...)
The distinction is made by checking whether a slash is contained in the parameter

Changed behaviour: Builds only the frameworks. To build webdriver-ts or the results use the npm run install-local task
*/

let args = yargs(process.argv)
    .usage("npm run build [pattern] [-- [--check] [--skipIrrelevant] [--restartWith]]")
    .help('help')
    .boolean('check')
    .boolean('skipIrrelevant')
    .string('restartWith')
    .argv;

let allArgs = args._.slice(2);
var referenceBranch = "origin/master";
var restartWithFramework = args.restartWith || '';

var frameworks = [].concat(
  fs.readdirSync('./frameworks/keyed').map(f => ['keyed', f]),
  fs.readdirSync('./frameworks/non-keyed').map(f => ['non-keyed', f]));

function notRestarter(pattern, [dir, name]) {
  let key = pattern.indexOf('/') != -1 ? `${dir}/${name}` : name;
  const idx = pattern.indexOf('*');

  if (idx != -1) {
    key = key.substring(0, idx);
  }
  return pattern != key;
}

let skippable;
let buildable;

if (restartWithFramework) {
  skippable = _.takeWhile(frameworks, notRestarter.bind(null, restartWithFramework));
  buildable = _.slice(frameworks, skippable.length);
} else if (allArgs.length) {
  let patterns = allArgs;
  [ skippable, buildable ] = _.reduce(frameworks, (acc, item) => {
    const res = !patterns.every(pattern => notRestarter(pattern, item));

    (res ? acc[1] : acc[0]).push(item);
    return acc;
  }, [[], []]);
} else {
  skippable = [];
  buildable = frameworks;
}

var relevant = args.skipIrrelevant 
    ? _.filter(buildable, isDifferent)
    : buildable;

_.each(skippable, ([dir,name]) => console.log("*** Skipping " + dir + "/" + name));

_.each(relevant, function([dir,name]) {
  let fullname = path.join("frameworks", dir, name);
  if(fs.statSync(fullname).isDirectory() && fs.existsSync(path.join(fullname, "package.json"))) {
          console.log("*** Executing npm install in "+fullname);
            exec('npm install', {
        cwd: fullname,
        stdio: 'inherit'
      });
      console.log("*** Executing npm run build-prod in "+fullname);
      exec('npm run build-prod', {
        cwd: fullname,
        stdio: 'inherit'
      });
  }
});

var testable = args.check ? relevant : [];
_.each(testable, function([dir,name]) {
      let fullname = path.join("frameworks", dir, name);
      if(fs.statSync(fullname).isDirectory() && fs.existsSync(path.join(fullname, "package.json"))) {
            console.log("*** Executing npm run selenium for "+fullname);
            exec(`npm run bench ${dir}/${name} -- --count 1 --fork false --noResults`, {
        cwd: "webdriver-ts",
        stdio: 'inherit'
      });
  }
});

function isDifferent([dir,name]) {
  try { exec('git diff --quiet ' + referenceBranch + ' -- ' + dir + name); }
  catch(e) { return true; }
  return false;
};
