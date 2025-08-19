"use client";

import { Advocate } from "../types/Advocate";
import { Specialty } from "../types/Specialty";

export default function AdvocateRow({ advocate }: { advocate: Advocate }) {
  return (
    <tr>
      <td>{advocate.firstName}</td>
      <td>{advocate.lastName}</td>
      <td>{advocate.city}</td>
      <td>{advocate.degree}</td>
      <td>
        {/* these should be comma separated and opt to expand ? and also need an id attached or styled bubbles ?*/}
        {advocate.specialties.map((s: Specialty) => (
          <span key={s.id}>{s.name}</span>
        ))}
      </td>
      <td>{advocate.yearsOfExperience}</td>
      <td>{advocate.phoneNumber}</td>
    </tr>
  );
}
