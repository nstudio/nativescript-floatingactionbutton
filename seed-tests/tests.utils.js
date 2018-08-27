var exec = require('child_process').exec;
var rimraf = require('rimraf');
var ncp = require('ncp').ncp;
var fs = require('fs');
var async = require("async");
var os = require('os');
var constants = require('./tests.constants');

exports.findInFiles = function findInFiles(string, dir, callback) {
    var _resultsCount = 0;
    var _excludedPaths = ["node_modules", "src/scripts/postclone", "/seed-tests/", ".git"];

    function _findInFiles(string, dir, callback) {
        fs.readdir(dir, function (err, entries) {
            entries = entries.filter(function (entry) {
                var fullEntry = dir + '/' + entry;
                var shouldBeIncluded = true;
                _excludedPaths.forEach(function callback(currentValue) {
                    shouldBeIncluded = fullEntry.indexOf(currentValue) === -1 && shouldBeIncluded;
                });

                return shouldBeIncluded;
            });
            async.eachSeries(entries, function (entry, foreachCallback) {
                entry = dir + '/' + entry;
                fs.stat(entry, function (err, stat) {
                    if (stat && stat.isDirectory()) {
                        _findInFiles(string, entry, foreachCallback);
                    } else {
                        fs.readFile(entry, 'utf-8', function (err, contents) {
                            if (contents.indexOf(string) > -1) {
                                _resultsCount++;
                            }

                            foreachCallback();
                        });
                    }
                });
            }, function (err) {
                callback();
            });
        });
    };

    _findInFiles(string, dir, function () {
        callback(_resultsCount);
    });
};

exports.copySeedDir = function copySeedDir(seedLocation, copyLocation, callback) {
    rimraf.sync(copyLocation);

    ncp(seedLocation, copyLocation, {
        filter: function (fileName) {            
            if ((fileName.indexOf("seed-tests") > -1 && fileName.indexOf(constants.SEED_COPY_LOCATION) > -1) ||
                (fileName.indexOf("demo") > -1 && fileName.indexOf("node_modules") > -1)||
                (fileName.indexOf("seed-tests") > -1 && fileName.indexOf("node_modules") > -1) ||
                (fileName.indexOf("src") > -1 && fileName.indexOf("node_modules") > -1) ||
                (fileName.indexOf("demo") > -1 && fileName.indexOf("platforms") > -1)) {
                return false;
            }

            return true;
        }
    }, function (err) {
        if (!err) {
            console.log(copyLocation + ' folder successfully created.');
        }
        callback(err);
    });
};

exports.callPostclone = function callPostclone(seedLocation, githubUsername, pluginName, initGit, callback) {
    var postcloneScript = getPackageJsonPostcloneScript();
    postcloneScript = postcloneScript.replace("postclone.js", "postclone.js gitHubUsername=" + githubUsername + " pluginName=" + pluginName + " initGit=" + initGit);
    exec("cd " + seedLocation + "/src && " + postcloneScript, function (error, stdout, stderr) {
        callback(error, stdout, stderr);
    });
};

exports.callDevelopmentSetup = function callDevelopmentSetup(seedLocation, callback) {
    exec("cd " + seedLocation + "/src && npm run development.setup", function (error, stdout, stderr) {
        callback(error, stdout, stderr);
    });
};

exports.getNpmLinks = function getNpmLinks(callback) {
    exec("npm list -g --depth=0", function (error, stdout, stderr) {
        var links = stdout.split(os.EOL)
            .map(function (item) {
                return item.replace("├──", "").replace("└──", "").trim();
            })
            .filter(function (item) {
                return !!item && item.indexOf("->") !== -1;
            });

        callback(links);
    });
}

exports.removeNpmLink = function removeNpmLink(packageName, callback) {
    exec("npm remove " + packageName + " -g", function (error, stdout, stderr) {
        callback();
    });
}

exports.isAndroid = function isAndroid() {
    return !!!process.env.IOS;
}

function getPackageJsonPostcloneScript() {
    var packageJsonFile = constants.SEED_COPY_LOCATION + "/src/package.json";

    if (fs.lstatSync(packageJsonFile).isFile()) {
        var packageJson = JSON.parse(fs.readFileSync(packageJsonFile, 'utf8'));
        var packageJsonScripts = packageJson["scripts"];

        if (packageJsonScripts && packageJsonScripts["postclone"]) {
            return packageJsonScripts["postclone"];
        };
    }

    return "";
}