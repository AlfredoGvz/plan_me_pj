import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SortByDsk() {
  // Get the current search parameters and set up the state for the inputs
  const [searchParams, setSearchParams] = useSearchParams();

  // State for checkboxes
  const [isCityChecked, setIsCityChecked] = useState(false);
  const [isDateChecked, setIsDateChecked] = useState(false);
  const [isAscChecked, setIsAscChecked] = useState(false); // Asc checkbox
  const [isDescChecked, setIsDescChecked] = useState(false); // Desc checkbox

  // Sync state with search parameters when the component mounts or when the searchParams change
  useEffect(() => {
    // Get sorting criteria (e.g., "city,date")
    const sortBy = searchParams.get("sort_by");
    const order = searchParams.get("sort_order");

    if (sortBy) {
      const sortCriteria = sortBy.split(",");
      setIsCityChecked(sortCriteria.includes("city"));
      setIsDateChecked(sortCriteria.includes("date"));
    }

    // Set the sort order (ASC or DESC) from the URL
    if (order) {
      setIsAscChecked(order === "ascending");
      setIsDescChecked(order === "descending");
    }
  }, [searchParams]);

  // Update URL parameters for checkboxes
  const handleSortBy = (sort_by, isChecked) => {
    const updatedParams = new URLSearchParams(searchParams);
    let sortCriteria = updatedParams.get("sort_by")
      ? updatedParams.get("sort_by").split(",")
      : [];

    // Add or remove criteria based on checkbox state
    if (isChecked) {
      if (!sortCriteria.includes(sort_by)) {
        sortCriteria.push(sort_by);
      }
    } else {
      sortCriteria = sortCriteria.filter((criteria) => criteria !== sort_by);
    }

    // Update the searchParams or remove the parameter if nothing is checked
    if (sortCriteria.length > 0) {
      updatedParams.set("sort_by", sortCriteria.join(","));
    } else {
      updatedParams.delete("sort_by");
    }

    // Update the state accordingly after updating the searchParams
    setSearchParams(updatedParams);
  };

  // Handle Asc/Desc checkboxes logic
  const handleSortOrderChange = (order) => {
    const updatedParams = new URLSearchParams(searchParams);

    if (order === "ascending") {
      setIsAscChecked(true);
      setIsDescChecked(false); // Uncheck "DESC"
      updatedParams.set("sort_order", "ascending");
    } else if (order === "descending") {
      setIsAscChecked(false); // Uncheck "ASC"
      setIsDescChecked(true);
      updatedParams.set("sort_order", "descending");
    }

    setSearchParams(updatedParams);
  };

  return (
    <div className="tablet:flex flex-col">
      <div className="divider"></div>
      <p>Sort Events</p>

      <div className="flex tablet:flex-col gap-4 tablet:gap-1 mt-3">
        {/* City Checkbox */}
        <div className="flex gap-1">
          <input
            type="checkbox"
            id="cityCheckbox"
            value="city"
            checked={isCityChecked}
            onChange={(e) => {
              setIsCityChecked(e.target.checked); // Update state first
              handleSortBy(e.target.value, e.target.checked); // Then update search params
            }}
          />
          <label htmlFor="cityCheckbox">City</label>
        </div>

        {/* Date Checkbox */}
        <div className="flex gap-1">
          <input
            type="checkbox"
            id="dateCheckbox"
            value="date"
            checked={isDateChecked}
            onChange={(e) => {
              setIsDateChecked(e.target.checked); // Update state first
              handleSortBy(e.target.value, e.target.checked); // Then update search params
            }}
          />
          <label htmlFor="dateCheckbox">Date</label>
        </div>
      </div>

      <div>
        <div className="divider"></div>
        <p>Order Events</p>

        <div className="flex tablet:flex-col gap-4 tablet:gap-1 mt-3">
          {/* Ascending Checkbox */}
          <div className="flex gap-1">
            <input
              type="radio"
              id="ascCheckbox"
              value="ascending"
              checked={isAscChecked}
              onChange={() => {
                if (!isAscChecked) {
                  handleSortOrderChange("ascending");
                } else {
                  // If ASC is already checked and clicked, uncheck it and remove from URL
                  setIsAscChecked(false);
                  const updatedParams = new URLSearchParams(searchParams);
                  updatedParams.delete("sort_order");
                  setSearchParams(updatedParams);
                }
              }}
            />
            <label htmlFor="ascCheckbox">Ascending</label>
          </div>

          {/* Descending Checkbox */}
          <div className="flex gap-1">
            <input
              type="radio"
              id="descCheckbox"
              value="DESC"
              checked={isDescChecked}
              onChange={() => {
                if (!isDescChecked) {
                  handleSortOrderChange("descending");
                } else {
                  // If DESC is already checked and clicked, uncheck it and remove from URL
                  setIsDescChecked(false);
                  const updatedParams = new URLSearchParams(searchParams);
                  updatedParams.delete("sort_order");
                  setSearchParams(updatedParams);
                }
              }}
            />
            <label htmlFor="descCheckbox">Descending</label>
          </div>
        </div>
      </div>
    </div>
  );
}
