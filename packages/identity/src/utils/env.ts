export function env(key: string): string {
  const variable = process.env[key];

  if (!variable) {
    throw new Error(`Environment variable ${key} is undefined!`);
  }

  return variable;
}
