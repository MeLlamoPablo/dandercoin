export type Parameter = Readonly<{
  type: string;
  value: string;
}>;

export type Action = Readonly<{
  functionName: string;
  parameters: readonly Parameter[];
  target: string;
}>;

export type FormModel = Readonly<{
  actions: readonly Action[];
  description: string;
  title: string;
}>;

export type Props = {
  hash: ((input: string) => string) | undefined;
  onSubmit: (values: FormModel) => void;
};
