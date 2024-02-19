export const LoadingButton = ({ isLoading, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="mb-6 btn btn-primary w-full hover:btn-accent "
      style={{ position: "relative" }}
    >
      {isLoading ? (
        <div
          className="bg-primary loading loading-spinner loading-md"
          aria-hidden="true"
        ></div> // Add your spinner styling here
      ) : (
        children
      )}
    </button>
  );
};
