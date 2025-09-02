export class Age {
  private readonly year: number;
  private readonly month: number;

  private constructor(year: number, month: number) {
    this.year = year;
    this.month = month;
  }

  public static initialize() {
    return new Age(0, 0);
  }

  public static fromYear(year: number) {
    return new Age(year, 0);
  }

  public get text() {
    return this.month < 2
      ? `${this.year}y/o ${this.month}mo.`
      : `${this.year}y/o ${this.month}mos.`;
  }

  public increment() {
    const tmp = this.month + 1;
    const month = tmp % 12;
    const year = this.year + Math.floor(tmp / 12);
    return new Age(year, month);
  }

  public toEqual(other: Age) {
    return this.year === other.year && this.month === other.month;
  }
}
