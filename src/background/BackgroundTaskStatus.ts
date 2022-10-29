export default class BackgroundTaskStatus {
  private constructor() {
    //does nothing
  }

  static get OFF(): string {
    return 'OFF';
  }

  static get PREREQUISITES_NOT_MET(): string {
    return 'PREREQUISITES_NOT_MET';
  }

  static get CONNECTING(): string {
    return 'CONNECTING';
  }

  static get CONNECTED(): string {
    return 'CONNECTED';
  }

  static get CONTRIBUTING(): string {
    return 'CONTRIBUTING';
  }
}
