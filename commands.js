const fs = require('fs');

function done(output) {
  process.stdout.write(output);
  process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch(command) {
    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "sort":
      commandLibrary.sort(userInputArray.slice(1));
      break;
    case "wc":
      commandLibrary.wc(userInputArray.slice(1));
    case "head":
      commandLibrary.head(userInputArray.slice(1));
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
    default:
      done("Invalid command!");
  }
}

const commandLibrary = {
  "echo": function(userInput) {
    done(userInput);
  },
  "cat": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
      if (err) throw err;
      done(data);
    });
  },
  "sort": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) throw err;
      const lines = data.split('\n');
      const sortedlines = lines.sort();
      done(sortedlines.join('\n'));
    });
  },
  "wc": function(fullPath) {
    const fileName = fullPath[0];
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) throw err;
      const regExp = /[ \t\n\r]+/g;
      let wordCount = 0;
      let lineCount = 0;
      let byteCount = 0;
      const lines = data.split('\n');
      for (let i = 0; i < lines.length; i++) {
        lineCount++;
        let line = lines[i].split(regExp);
        wordCount = wordCount + line.length;
      }
      for(let j = 0; j < data.length; j++){
        byteCount++;
      }
      done("\nLine count: " + lines.length + "\nWord count: " + wordCount + "\nByte count: " + byteCount);
    });
  },
  "head": function(fullPath) {
    const fileName = fullPath[0];
    const n = 10;
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) throw err;
      let output = [];
      const lines = data.split('\n');
      for (let i = 0; lines.length < n ? i < lines.length : i < n; i++) {
        output.push(lines[i]);
      }
      done(output.join('\n'));
    });
  },
  "tail": function(fullPath) {
    const fileName = fullPath[0];
    const n = 10;
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) throw err;
      let output = [];
      const lines = data.split('\n');
      for (let i = lines.length < n ? 0 : lines.length - n; i < lines.length; i++) {
        output.push(lines[i]);
      }
      done(output.join('\n'));
    });
  }

};

module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;