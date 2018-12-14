import { IMyApp } from '../../../../app';

const app = getApp<IMyApp>();

function getIndex(key: any) {
  let result: any;
  let summary = app.globalData.summaryData;
  summary.forEach((item: any, i: any) => {
    for (let item_item in item) {
      if (item_item === key) {
        result = i;
      }
    }
  });

  return result;
}

function parse(result: any) {
  let title: string;
  let key: string;

  for (let item in result) {
    key = item;
    title = result[key];
  }

  // @ts-ignore
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
