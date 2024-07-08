import { useContext, useEffect, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from 'firebaseApp';
import AuthContext from 'context/AuthContext';
import { toast } from 'react-toastify';

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

type TabType = 'all' | 'my';

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  uid: string;
}

export default function PostList({
  hasNavigation = true,
  defaultTab = 'all',
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
  const [posts, setPosts] = useState<PostProps[]>([]);
  const { user } = useContext(AuthContext);

  const getPosts = async () => {
    // post 초기화
    setPosts([]);
    let postRef = collection(db, 'posts');
    let postQuery;

    if (activeTab === 'my' && user) {
      // 내 글만 필터링
      postQuery = query(
        postRef,
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );
    } else {
      postQuery = query(postRef, orderBy('createdAt', 'desc'));
    }
    const data = await getDocs(postQuery);
    data?.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };

      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };

  const handleDelete = async (id?: string) => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');

    if (id && confirm) {
      await deleteDoc(doc(db, 'posts', id));

      toast.success('게시글을 삭제했습니다.');
      getPosts();
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className='post__navigation'>
          <div
            role='presentation'
            onClick={() => setActiveTab('all')}
            className={activeTab === 'all' ? 'post__navigation--active' : ''}
          >
            전체
          </div>
          <div
            role='presentation'
            onClick={() => setActiveTab('my')}
            className={activeTab === 'my' ? 'post__navigation--active' : ''}
          >
            나의 글
          </div>
        </div>
      )}
      <div className='post__list'>
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <div key={post?.id} className='post__box'>
              <Link to={`/posts/${post?.id}`}>
                <div className='post__profile-box'>
                  <div className='post__profile' />
                  <div className='post__author-name'>{post?.email}</div>
                  <div className='post__date'>{post?.createdAt}</div>
                </div>
                <div className='post__title'>{post?.title}</div>
                <div className='post__text'>{post?.summary}</div>
              </Link>
              {post?.email === user?.email && (
                <div className='post__utils-box'>
                  <div
                    className='post__delete'
                    role='presentation'
                    onClick={() => handleDelete(post?.id)}
                  >
                    삭제
                  </div>
                  <div className='post__edit'>
                    <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className='post__no-post'>게시글이 없습니다.</div>
        )}
      </div>
    </>
  );
}
