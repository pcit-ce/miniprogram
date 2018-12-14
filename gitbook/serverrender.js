const Towxml = require('../client/towxml/main');
const towxml = new Towxml();
const fs = require('fs');

function render(gitbook) {
  let targetPath = `../client/gitbook/pages/index/${gitbook}_summary.js`;

  try {
    fs.accessSync(targetPath);
    console.log('file exists');

  } catch (e) {

    //Markdown转towxml数据
    let data = towxml.toJson(fs.readFileSync(`${gitbook}./summary.md`, 'utf-8'), 'markdown');

    fs.writeFileSync(targetPath, 'module.exports=' + JSON.stringify(data));

    // htm转towxml数据
    // let data = towxml.toJson('<h1>Article title</h1>','html');
  }
}

let gitbook = 'laravel';

reader(gitbook);

targetPath = `../client/gitbook/pages/content/${gitbook}_summary.ts`;

try {
  fs.accessSync(targetPath);
} catch (e) {
  fs.copyFileSync(`${gitbook}./summary.ts`, targetPath)
}
