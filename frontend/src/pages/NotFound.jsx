import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="bg-gray-bk w-full px-6 flex flex-col items-center justify-center gap-6 my-32  md:my-60">
      <h2>Page Not Found</h2>
      <p>Looks like the page you are looking for could not be found.</p>
      <br />
      <Link to={"/"}>
        <button className="btn btn-primary">Back To Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
