import Link from 'next/link';

const ButtonLink = ({ href, children, style }) => (
  <Link href={href} passHref>
    <div className={`inline-block ${style}`} >{children}</div>
  </Link>
);

export default ButtonLink;
