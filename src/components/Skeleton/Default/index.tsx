const Skeleton = () => {
  return (
    <div className="animate-pulse space-y-4 p-4">
      <div className="h-10 bg-gray-300 rounded-md w-3/4"></div>
      <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
      <div className="h-48 bg-gray-300 rounded-md"></div>
      <div className="h-6 bg-gray-300 rounded-md w-1/3"></div>
      <div className="h-6 bg-gray-300 rounded-md w-1/4"></div>
      <div className="space-y-2">
        <div className="h-6 bg-gray-300 rounded-md w-full"></div>
        <div className="h-6 bg-gray-300 rounded-md w-5/6"></div>
        <div className="h-6 bg-gray-300 rounded-md w-3/4"></div>
        <div className="h-6 bg-gray-300 rounded-md w-2/3"></div>
        <div className="h-6 bg-gray-300 rounded-md w-1/2"></div>
      </div>
    </div>
  );
};

export default Skeleton;
