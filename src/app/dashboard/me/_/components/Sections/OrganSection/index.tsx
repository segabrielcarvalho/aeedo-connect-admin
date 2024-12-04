"use client";

import Button from "@/components/Button";
import React, { useState } from "react";
import { BiDetail } from "react-icons/bi";
import { BsLungs } from "react-icons/bs";
import { FaHeart, FaRegEye } from "react-icons/fa";
import {
  GiInternalOrgan,
  GiKidneys,
  GiLiver,
  GiTiedScroll,
  GiValve,
} from "react-icons/gi";
import { IoWaterOutline } from "react-icons/io5";
import { LuBone, LuBrain } from "react-icons/lu";

export const organIcons = {
  Coração: <FaHeart className="w-8 h-8 text-red-500" />,
  Pulmão: <BsLungs className="w-8 h-8 text-blue-500" />,
  Rim: <GiKidneys className="w-8 h-8 text-purple-500" />,
  Fígado: <GiLiver className="w-8 h-8 text-orange-500" />,
  Pâncreas: <GiInternalOrgan className="w-8 h-8 text-yellow-500" />,
  Intestino: <GiInternalOrgan className="w-8 h-8 text-green-500" />,
  "Medula Óssea": <LuBrain className="w-8 h-8 text-gray-500" />,
  Córnea: <FaRegEye className="w-8 h-8 text-blue-400" />,
  Pele: <IoWaterOutline className="w-8 h-8 text-pink-400" />,
  Ossos: <LuBone className="w-8 h-8 text-gray-400" />,
  Cartilagem: <BiDetail className="w-8 h-8 text-teal-500" />,
  Tendões: <GiTiedScroll className="w-8 h-8 text-yellow-600" />,
  "Válvulas Cardíacas": <GiValve className="w-8 h-8 text-red-400" />,
};

const organsList = Object.keys(organIcons);

interface OrganSectionProps {
  userOrgans: string[];
}

const OrganSection: React.FC<OrganSectionProps> = ({ userOrgans }) => {
  const [selectedOrgans, setSelectedOrgans] = useState<string[]>(userOrgans);

  const toggleOrganSelection = (organ: string) => {
    setSelectedOrgans((prev) =>
      prev.includes(organ) ? prev.filter((o) => o !== organ) : [...prev, organ]
    );
  };

  return (
    <div>
      <h2 className="text-base/7 font-semibold text-gray-900">
        Órgãos Associados
      </h2>
      <p className="mt-1 text-sm/6 text-gray-500">
        Gerencie os órgãos associados ao usuário.
      </p>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {organsList.map((organ) => (
          <div
            key={organ}
            className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 cursor-pointer ${
              selectedOrgans.includes(organ)
                ? "border-indigo-600 bg-indigo-100"
                : "border-gray-300 bg-gray-100"
            }`}
            onClick={() => toggleOrganSelection(organ)}
          >
            {organIcons[organ as keyof typeof organIcons]}
            <span
              className={`mt-2 text-sm font-semibold ${
                selectedOrgans.includes(organ)
                  ? "text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              {organ}
            </span>
          </div>
        ))}
      </div>

      <Button className="w-full mt-6" color="primary" variant="unstyled">
        Salvar Alterações
      </Button>
    </div>
  );
};

export default OrganSection;
