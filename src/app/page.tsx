import { redirect } from "next/navigation";
import routes from "../routes";

export default function Home() {
  redirect(routes.home.path);
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}
