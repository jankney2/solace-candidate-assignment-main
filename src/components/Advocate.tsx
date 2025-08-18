"use client";

import { Advocate } from "../types/Advocate";
import { Specialty } from "../types/Specialty";
import { useState } from "react";

export default function AdvocateRow({ advocate }: { advocate: Advocate }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_VISIBLE_SPECIALTIES = 2;
  const hasMoreSpecialties =
    advocate.specialties.length > MAX_VISIBLE_SPECIALTIES;

  return (
    <tr className="hover:bg-solace-lightgray/50 transition-all ease-in-out">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-solace-darkblue">
        {advocate.firstName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-solace-darkblue">
        {advocate.lastName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-solace-darkblue">
        {advocate.city}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-solace-darkblue">
        {advocate.degree}
      </td>
      <td className="px-6 py-4 text-sm text-solace-darkblue">
        <div className="flex flex-wrap gap-1.5 items-center">
          <div
            className={`
              flex flex-wrap gap-1.5 items-center overflow-hidden transition-all ease-in-out
              ${isExpanded ? "max-h-[500px]" : "max-h-8"}
            `}
          >
            {advocate.specialties.map((s: Specialty, index: number) => (
              <span
                key={s.id}
                className={`
                  inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
                  bg-solace-blue/10 text-solace-blue transition-all ease-in-out
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
              className="inline-flex items-center px-2 py-0.5 text-xs font-medium text-solace-blue hover:text-solace-hover transition-colors"
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
      <td className="px-6 py-4 whitespace-nowrap text-sm text-solace-darkblue">
        {advocate.yearsOfExperience}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-solace-darkblue">
        {advocate.phoneNumber}
      </td>
    </tr>
  );
}
