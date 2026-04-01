export type SyntaxTheme = {
  name: string;
};

export class ColorDiff {
  constructor(
    private patch: unknown,
    private firstLine: string | null,
    private filePath: string,
    private fileContent: string | null
  ) {}

  render(_theme: string, _width: number, _dim: boolean): string[] {
    return [];
  }

  format(input: string): string {
    return input;
  }
}

export class ColorFile {
  format(input: string): string {
    return input;
  }
}

export function getSyntaxTheme(themeName: string): SyntaxTheme {
  return { name: themeName };
}
