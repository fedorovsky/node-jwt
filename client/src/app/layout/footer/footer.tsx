const buildHash = import.meta.env.VITE_GIT_COMMIT_HASH ?? 'unknown';

export const Footer = () => (
  <div className="container mx-auto text-center text-sm">
    <p>Build: {buildHash}</p>
    <p>© {new Date().getFullYear()} node-jwt</p>
  </div>
);
