import Header from 'components/Header';
import LoginForm from 'components/LoginForm';

export default function Login() {
  return (
    <>
      <Header hasNavigation={false} />
      <LoginForm />
    </>
  );
}
