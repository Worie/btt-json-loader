const fs = require('fs');
const { exec } = require('child_process');

const run = async function (directory) {
  const contents = await getContents(directory);
  
  contents.forEach((base64JSON, i) => {
    exec(`open "btt://jsonimport/${base64JSON}"`);
  });
}

const getContents = function (directory) {
  const entries = fs.readdirSync(directory);

  const jsons = entries.filter(entry => entry.match(/\.json$/))

  return Promise.all(jsons.map((jsonFile) => {
    return new Promise((resolve, reject) => {
        exec(`base64 -i  "${jsonFile}"`, (err, stdout) => {
          if (stdout) {
            resolve(stdout.trim());
          } else {
            reject(err);
          }
        });
    })
  })
);
}

exports.run = run;