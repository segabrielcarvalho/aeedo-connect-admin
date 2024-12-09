import { BsLungs } from "react-icons/bs";
import { FaHandHoldingHeart, FaHeart, FaRegEye } from "react-icons/fa";
import { GiInternalOrgan, GiKidneys, GiLiver } from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { LuBone, LuBrain } from "react-icons/lu";

const organIcons: { [key: string]: JSX.Element } = {
  "celulas-tronco": <LuBrain className="w-8 h-8 text-green-400" />,
  figado: <GiLiver className="w-8 h-8 text-orange-500" />,
  pulmoes: <BsLungs className="w-8 h-8 text-blue-500" />,
  coracao: <FaHeart className="w-8 h-8 text-red-500" />,
  rins: <GiKidneys className="w-8 h-8 text-purple-500" />,
  ovulos: <GiInternalOrgan className="w-8 h-8 text-pink-400" />,
  pancreas: <GiInternalOrgan className="w-8 h-8 text-yellow-500" />,
  cabelos: <IoWaterOutline className="w-8 h-8 text-brown-500" />,
  ossos: <LuBone className="w-8 h-8 text-gray-400" />,
  timpano: <FaRegEye className="w-8 h-8 text-blue-400" />,
};

export const getOrganIcon = (slug: string) => {
  return (
    organIcons[slug.toLowerCase()] || (
      <FaHandHoldingHeart className="w-8 h-8 text-red-500" />
    )
  );
};
