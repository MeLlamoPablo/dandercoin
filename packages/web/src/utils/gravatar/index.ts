import md5 from 'blueimp-md5';

export default function gravatar(email: string, size: number) {
  return `https://www.gravatar.com/avatar/${md5(
    email.trim().toLowerCase(),
  )}?s=${size}`;
}
