import { useSelector } from "react-redux";

function Home() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {/* <h1 className="mb-4 text-3xl font-bold">Advanced To-Do App</h1> */}

      {isAuthenticated && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="mb-2 text-4xl font-semibold">Welcome, {user?.name}!</p>
        </div>
      )}
    </>
  );
}

export default Home;
