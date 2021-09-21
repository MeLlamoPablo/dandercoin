type Politician = {
  address: string;
  description: string;
  images: Readonly<{
    png800: string;
    png600: string;
    png400: string;
    webp800: string;
    webp600: string;
    webp400: string;
  }>;
  name: string;
  prefix: string;
};

export type Props = {
  politicians: readonly Politician[];
};
