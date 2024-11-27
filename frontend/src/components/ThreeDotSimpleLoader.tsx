export const ThreeDotSimpleLoader = () => {
  return (
    <div className="flex items-center justify-center space-x-2 dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="size-4 animate-bounce rounded-full bg-gray-800 dark:bg-gray-400 [animation-delay:-0.3s]" />
      <div className="size-4 animate-bounce rounded-full bg-gray-800 dark:bg-gray-400  [animation-delay:-0.15s]" />
      <div className="size-4 animate-bounce rounded-full bg-gray-800 dark:bg-gray-400" />
    </div>
  );
};
