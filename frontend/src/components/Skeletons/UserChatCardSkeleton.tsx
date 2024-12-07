const UserChatCardSkeleton = () => {
  return (
    <div className="flex gap-2 justify-start items-center my-1 p-2 border rounded-md shadow-sm animate-pulse">
      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      <div className="hidden lg:flex flex-col gap-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
      </div>
    </div>
  );
};

export default UserChatCardSkeleton;
