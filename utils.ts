export function isDefined<T extends {}>(obj: T | {}): obj is T {
  return Object.keys(obj).length !== 0;
}
