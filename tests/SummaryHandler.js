const toSummaryJson = require('../client/gitbook/pages/index/SummaryHandler').default;
const fs = require('fs');

let summary = fs.readFileSync(__dirname + '/SUMMARY.md','utf-8');

let result = toSummaryJson(summary,'nginx-docs.zh-cn');

console.log(result[1]);
