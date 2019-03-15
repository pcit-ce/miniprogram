import Staring from './Starring';

export default class Activity {
  public staring: Staring;

  constructor(public url: string) {
    this.staring = new Staring(url);
  }
}
