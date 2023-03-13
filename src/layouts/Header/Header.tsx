import "./Header.scss";

interface IHeaderProps {
  className?: string;
}

function Header({ className }: IHeaderProps) {
  return <div className={` Header ${className && className}`}>Header</div>;
}

export default Header;
