import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <header>
        <div>
          <Link to={'/posts/new'}>글쓰기</Link>
          <Link to={'/posts'}>게시글</Link>
          <Link to={'/profile'}>프로필</Link>
        </div>
      </header>
      <div className='post__navigation'>
        <div>전체</div>
        <div>나의 글</div>
      </div>
      <div className='post__list'>
        {[...Array(10)].map((e, index) => (
          <div key={index} className='post__box'>
            <Link to={`/posts/${index}`}>
              <div className='post__profile-box'>
                <div className='post__profile' />
                <div className='post__author-name'>YESJIN</div>
                <div className='post__date'>2024.06.18 화요일</div>
              </div>
              <div className='post__title'>게시글 {index}</div>
              <div className='post__text'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </div>
              <div className='post__utils-box'>
                <div className='post__delete'>삭제</div>
                <div className='post__edit'>수정</div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <footer>
        <div>Menu 1</div>
        <div>Menu 2</div>
        <div>Menu 3</div>
      </footer>
    </div>
  );
}
