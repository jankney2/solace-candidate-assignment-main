"use client";

import { useEffect, useState } from "react";
import AdvocateRow from "../components/Advocate";
import { Advocate } from "@/types/Advocate";

// fixes
// restyle
// add tailwind classes (mobile responsive)

//features
// add pagination (?)
// axios client with JWT
// no advocates found message
// add sorting by column (?)
// add a loading page
// split search boxes out into their own component

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<string[]>([
    "firstName",
    "lastName",
    "specialties",
    // "city",
    // "degree",
    "yearsOfExperience",
    // "phoneNumber",
  ]);

  useEffect(() => {
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const modifySearchColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSearchBy([...searchBy, e.target.value]);
    } else {
      setSearchBy(searchBy.filter((item) => item !== e.target.value));
    }
  };

  const shouldRenderAdvocate = (advocate: Advocate) => {
    return searchBy.some((column) => {
      if (column === "specialties") {
        return advocate.specialties.some((specialty) =>
          specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (column === "yearsOfExperience" || column === "phoneNumber") {
        return advocate[column as keyof Advocate]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      const value = advocate[column as keyof Advocate];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  return (
    <main>
      <h1>Solace Advocates</h1>
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term">{searchTerm}</span>
        </p>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: "1px solid black" }}
        />

        <div>
          include columns:
          <input
            type="checkbox"
            onChange={modifySearchColumns}
            value="firstName"
            defaultChecked={searchBy.includes("firstName")}
          />
          <label htmlFor="firstName"> First Name</label>
          <input
            type="checkbox"
            onChange={modifySearchColumns}
            value="lastName"
            defaultChecked={searchBy.includes("lastName")}
          />
          <label htmlFor="lastName"> Last Name</label>
          <input
            type="checkbox"
            onChange={modifySearchColumns}
            value="city"
            defaultChecked={searchBy.includes("city")}
          />
          <label htmlFor="city"> City</label>
          <input
            type="checkbox"
            onChange={modifySearchColumns}
            value="degree"
            defaultChecked={searchBy.includes("degree")}
          />
          <label htmlFor="degree"> Degree</label>
          <input
            type="checkbox"
            onChange={modifySearchColumns}
            value="specialties"
            defaultChecked={searchBy.includes("specialties")}
          />
          <label htmlFor="specialties"> Specialties</label>
          <input
            type="checkbox"
            onChange={modifySearchColumns}
            value="yearsOfExperience"
            defaultChecked={searchBy.includes("yearsOfExperience")}
          />
          <label htmlFor="yearsOfExperience"> Years of Experience</label>
          <input
            type="checkbox"
            onChange={modifySearchColumns}
            value="phoneNumber"
            defaultChecked={searchBy.includes("phoneNumber")}
          />
          <label htmlFor="phoneNumber"> Phone Number</label>
        </div>
        <button onClick={() => setSearchTerm("")}>Reset Search</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>City</th>
            <th>Degree</th>
            <th>Specialties</th>
            <th>Years of Experience</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate: Advocate) => {
            return shouldRenderAdvocate(advocate) ? (
              <AdvocateRow key={advocate.id} advocate={advocate} />
            ) : null;
          })}
        </tbody>
      </table>
    </main>
  );
}
