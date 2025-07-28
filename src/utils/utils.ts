export async function tryCatch<T>(
  fn: () => Promise<T>,
): Promise<[T | null, Error | null]> {
  try {
    return [await fn(), null];
  } catch (error) {
    return [null, error];
  }
}
