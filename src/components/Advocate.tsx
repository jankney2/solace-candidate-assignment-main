"use client";

import { Advocate } from "../types/Advocate";
import { Specialty } from "../types/Specialty";
import { useState } from "react";

export default function AdvocateRow({ advocate }: { advocate: Advocate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE_SPECIALTIES = 2;
  const hasMoreSpecialties =
    advocate.specialties.length > MAX_VISIBLE_SPECIALTIES;

  const visibleSpecialties = isExpanded
    ? advocate.specialties
    : advocate.specialties.slice(0, MAX_VISIBLE_SPECIALTIES);

  return (
    <tr className="hover:bg-gray-50 transition-all  ease-in-out">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.firstName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {advocate.lastName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 transition-all ">
        {advocate.city}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 transition-all ">
        {advocate.degree}
      </td>
      <td className="px-6 py-4 text-sm text-gray-900 transition-all ">
        <div className="flex flex-wrap gap-1.5 items-center">
          <div
            className={`
            flex flex-wrap gap-1.5 items-center overflow-hidden transition-all  ease-in-out
            ${isExpanded ? "max-h-[500px]" : "max-h-8"}
          `}
          >
            {advocate.specialties.map((s: Specialty, index: number) => (
              <span
                key={s.id}
                className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  bg-blue-100 text-blue-800 transition-all  ease-in-out
                  ${
                    index >= MAX_VISIBLE_SPECIALTIES && !isExpanded
                      ? "h-0 opacity-0 p-0 m-0"
                      : "opacity-100"
                  }
                `}
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                {s.name}
              </span>
            ))}
          </div>
          {hasMoreSpecialties && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors "
            >
              {isExpanded
                ? "Show Less"
                : `+${
                    advocate.specialties.length - MAX_VISIBLE_SPECIALTIES
                  } More`}
            </button>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 transition-all ">
        {advocate.yearsOfExperience}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 transition-all ">
        {advocate.phoneNumber}
      </td>
    </tr>
  );
}
