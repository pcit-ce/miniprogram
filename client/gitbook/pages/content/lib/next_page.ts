import { IMyApp } from '../../../../app';

const app = getApp<IMyApp>();

function getIndex(key: any) {
  let result: any;
  let summary = app.globalData.summaryData;
  // console.log(key);
  summary.forEach((item: any, i: any) => {
    // console.log(item['path']);
    if (item['path'] === key) {
      result = i;
    }
  });

  return result;
}

function parse(result: any) {
  let title: string = result['title'];
  let key: string = result['path'];

  return [title, key];
}

export function next(key: any): any {
  let index = getIndex(key);
  let summary = app.globalData.summaryData;
  let result = summary[index + 1];
  if (result) {
    return parse(result);
  }

  return undefined;
}

export function before(key: any): any {
  let index = getIndex(key);
  let summary = app.globalData.summaryData;
  let result = summary[index - 1];
  if (result) {
    return parse(result);
  }

  return undefined;
}

export default next;
