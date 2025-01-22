export const Footer = () => {
  return (
    <div className="container mx-auto text-center">
      <p className="text-sm">HASH: {import.meta.env.VITE_GIT_COMMIT_HASH}</p>
      <p className="text-sm">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </p>
    </div>
  );
};
