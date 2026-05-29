
interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
