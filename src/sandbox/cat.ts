export class Cat {
  private readonly sex;

  private constructor(generate: () => number) {
    this.sex = generate() <= 47;
  }

  public static create(random: (max: number) => () => number) {
    return new Cat(random(100));
  }

  public get status() {
    return { sex: this.sex };
  }
}
