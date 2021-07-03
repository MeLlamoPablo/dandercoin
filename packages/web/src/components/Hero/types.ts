type Image = {
  height: number;
  src: string;
  srcSet: string;
  width: number;
};

export type Props = {
  className?: string;
  img: Image;
  imgWebp: Image;
  title: string;
};
