import { Link } from 'react-router-dom';

interface HeaderProps {
  hasNavigation?: boolean;
}

export default function Header({ hasNavigation = true }: HeaderProps) {
  return (
    <header>
      <Link to={'/'} className='header__logo'>
        React Blog
      </Link>
      <div>
        {hasNavigation && (
          <>
            <Link to={'/posts/new'}>글쓰기</Link>
            <Link to={'/posts'}>게시글</Link>
            <Link to={'/profile'}>프로필</Link>
          </>
        )}
      </div>
    </header>
  );
}
