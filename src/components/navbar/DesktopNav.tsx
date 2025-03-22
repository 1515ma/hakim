
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/hooks/use-language';

interface NavLinkProps {
  path: string;
  name: string;
  isActive: boolean;
}

const NavLink = ({ path, name, isActive }: NavLinkProps) => (
  <Link
    to={path}
    className={`text-sm transition-smooth hover:text-hakim-light ${
      isActive 
        ? 'text-hakim-light font-medium' 
        : 'text-hakim-gray'
    }`}
  >
    {name}
  </Link>
);

interface DesktopNavProps {
  navLinks: { name: string; path: string }[];
}

const DesktopNav = ({ navLinks }: DesktopNavProps) => {
  const location = useLocation();
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navLinks.map((link) => (
        <NavLink 
          key={link.name}
          path={link.path}
          name={link.name}
          isActive={location.pathname === link.path}
        />
      ))}
    </div>
  );
};

export default DesktopNav;
