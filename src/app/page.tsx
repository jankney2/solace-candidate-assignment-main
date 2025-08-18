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
        console.log(jsonResponse);
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

  const formatPhoneNumber = (phoneNumber: string | number) => {
    const cleaned = String(phoneNumber).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    }
    return phoneNumber;
  };

  const shouldRenderAdvocate = (advocate: Advocate) => {
    return searchBy.some((column) => {
      if (column === "specialties") {
        return advocate.specialties.some((specialty) =>
          specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (column === "yearsOfExperience") {
        return advocate[column]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      if (column === "phoneNumber") {
        const formattedPhone = formatPhoneNumber(advocate[column]);
        return formattedPhone.toLowerCase().includes(searchTerm.toLowerCase());
      }
      const value = advocate[column as keyof Advocate];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Solace Advocates
      </h1>

      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-700">Search</p>
          <p className="text-sm text-gray-600">
            Searching for: <span className="font-medium">{searchTerm}</span>
          </p>
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search advocates..."
          />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Include columns:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={modifySearchColumns}
                value="firstName"
                defaultChecked={searchBy.includes("firstName")}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">First Name</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={modifySearchColumns}
                value="lastName"
                defaultChecked={searchBy.includes("lastName")}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Last Name</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={modifySearchColumns}
                value="city"
                defaultChecked={searchBy.includes("city")}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">City</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={modifySearchColumns}
                value="degree"
                defaultChecked={searchBy.includes("degree")}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Degree</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={modifySearchColumns}
                value="specialties"
                defaultChecked={searchBy.includes("specialties")}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Specialties</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={modifySearchColumns}
                value="yearsOfExperience"
                defaultChecked={searchBy.includes("yearsOfExperience")}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Years of Experience</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                onChange={modifySearchColumns}
                value="phoneNumber"
                defaultChecked={searchBy.includes("phoneNumber")}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Phone Number</span>
            </label>
          </div>
        </div>

        <button
          onClick={() => setSearchTerm("")}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          Reset Search
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Degree
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialties
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Years of Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {advocates.map((advocate: Advocate) => {
              return shouldRenderAdvocate(advocate) ? (
                <AdvocateRow key={advocate.id} advocate={advocate} />
              ) : null;
            })}
          </tbody>
        </table>
      </div>
    </main>
  );
}
