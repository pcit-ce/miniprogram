export default function SummaryHandler(
  summary: string,
  gitbook = '',
  branch = 'master',
) {
  let newSummary: string = '';
  const line = summary.split('\n');

  let array: any = [];

  line.forEach((v: any) => {
    // console.log(v);
    if (v.match(/^#/) !== null || !v) {
      newSummary = `${newSummary}${v}\n`;

      return;
    }

    let path;
    let key;

    try {
      key = v.split('](')[0].split('[')[1];
    } catch (e) {
      newSummary = `${newSummary}${v}\n`;

      return;
    }

    try {
      path = v.split('(')[1].split(')')[0];
    } catch (e) {
      newSummary = `${newSummary}${v}\n`;

      return;
    }

    let newPath = `../content/index?branch=${branch}&gitbook=${gitbook}&key=${path.replace(
      /\s/g,
      '%20',
    )}`;
    newSummary = `${newSummary}${v.replace(path, newPath)}\n`;

    if (path.match(/^http:\/\/|^https:\/\//)) {
      return;
    }

    array = [...array, { title: key, path: path.replace(/\s/g, '%20') }];
  });

  return [newSummary, array];
}
