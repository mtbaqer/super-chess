export function isDefined<T extends {}>(obj: T | {}): obj is T {
  return Object.keys(obj).length !== 0;
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
