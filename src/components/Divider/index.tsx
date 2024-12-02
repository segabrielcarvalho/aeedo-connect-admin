export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

const Divider = ({ title, ...props }: DividerProps) => {
  return (
    <div className={`relative ${props}`}>
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-200" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-neutral-base-white px-2 text-sm text-gray-500">
          {title}
        </span>
      </div>
    </div>
  );
};
export default Divider;
