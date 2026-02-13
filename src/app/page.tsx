"use client";
import { useEffect, useState } from "react";
import AdvocateRow from "../components/Advocate";
import { Advocate } from "@/types/Advocate";

// fixes
// restyle
// add tailwind classes (mobile responsive)

//features
// add pagination (?)
// client with JWT
// no advocates found message
// add sorting by column (?)
// add a loading page
// split search boxes out into their own component
// additional data click through for each advocate ?

export default function AdvocatePage() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState<string[]>([
    "firstName",
    "lastName",
    "specialties",
    "yearsOfExperience",
  ]);

  // bad pattern? or since this is a client side component i need to grab from the api?
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
      if (column === "yearsOfExperience") {
        return advocate[column]
          .toString()
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      }
      if (column === "phoneNumber") {
        return advocate[column]
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
    <main className="min-h-screen bg-solace-lightgray">
      <div className="bg-solace-darkblue py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-bold text-white mb-4">Our Advocates</h1>
          <p className="text-lg text-gray-300 mb-8">
            Connect with our experienced healthcare professionals
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-solace p-6 mb-8">
          <div className="mb-6">
            <label className="block text-solace-darkblue text-sm font-medium mb-2">
              Search Advocates
            </label>
            <input
              type="text"
              placeholder="Search advocates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-solace-blue focus:border-transparent"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-solace-darkblue">
              Search by:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "firstName",
                "lastName",
                "degree",
                "city",
                "specialties",
                "yearsOfExperience",
                "phoneNumber",
              ].map((field) => (
                <label key={field} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    onChange={modifySearchColumns}
                    value={field}
                    defaultChecked={searchBy.includes(field)}
                    className="rounded border-gray-300 text-solace-blue focus:ring-solace-blue"
                  />
                  <span className="text-sm text-solace-gray capitalize">
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-solace overflow-hidden">
          <div className="relative">
            <div className="max-h-[600px] overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-solace-lightgray sticky top-0 z-10">
                  <tr>
                    <th className="px-6 py-3 bg-solace-lightgray text-left text-xs font-medium text-solace-gray uppercase tracking-wider">
                      First Name
                    </th>
                    <th className="px-6 py-3 bg-solace-lightgray text-left text-xs font-medium text-solace-gray uppercase tracking-wider">
                      Last Name
                    </th>
                    <th className="px-6 py-3 bg-solace-lightgray text-left text-xs font-medium text-solace-gray uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 bg-solace-lightgray text-left text-xs font-medium text-solace-gray uppercase tracking-wider">
                      Degree
                    </th>
                    <th className="px-6 py-3 bg-solace-lightgray text-left text-xs font-medium text-solace-gray uppercase tracking-wider">
                      Specialties
                    </th>
                    <th className="px-6 py-3 bg-solace-lightgray text-left text-xs font-medium text-solace-gray uppercase tracking-wider">
                      Years of Experience
                    </th>
                    <th className="px-6 py-3 bg-solace-lightgray text-left text-xs font-medium text-solace-gray uppercase tracking-wider">
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {advocates
                    .filter((advocate) => shouldRenderAdvocate(advocate))
                    .map((advocate: Advocate) => (
                      <AdvocateRow key={advocate.id} advocate={advocate} />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
