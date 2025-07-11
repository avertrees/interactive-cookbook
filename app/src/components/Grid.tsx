"use client";

import { useState } from "react";
import { css, cx } from "styled-system";
import { grid, flex } from "styled-system";
// import { card, label, button } from "@pandacss/dev"

// Sample data
const dataSources = [
  { id: 1, name: "Apple", source: "foodB" },
  { id: 2, name: "Banana", source: "usda" },
  { id: 3, name: "Carrot", source: "edamam" },
  { id: 4, name: "Dragonfruit", source: "OpenDataWeb" },
  { id: 5, name: "Eggplant", source: "open food data" },
  { id: 6, name: "Fig", source: "foodB" },
  { id: 7, name: "Grapes", source: "flavor bible" },
];

const filterOptions = ["foodB", "usda", "edamam", "OpenDataWeb", "open food data", "flavor bible"];

export default function DataGrid() {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const filteredData = selectedFilter
    ? dataSources.filter((item) => item.source === selectedFilter)
    : dataSources;

  return (
    <div className={cx(flex({ direction: "column", gap: "6", p: "6", w: "full" }))}>
      {/* Radio Button Group */}
      <div className={cx(flex({ direction: "row", gap: "4", wrap: "wrap" }))}>
        {filterOptions.map((option) => (
          <label key={option}>
          {/* <label key={option} className={cx(label({ cursor: "pointer" }))}> */}
            <input
              type="radio"
              name="filter"
              value={option}
              checked={selectedFilter === option}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className={css({ mr: "2" })}
            />
            {option}
          </label>
        ))}
        <button onClick={() => setSelectedFilter("")}>
        {/* <button className={cx(button())} onClick={() => setSelectedFilter("")}> */}
          Reset
        </button>
      </div>

      {/* Grid of Cards */}
      <div className={cx(grid({ columns: { base: 1, md: 3 }, gap: "4" }))}>
        {filteredData.map((item) => (
          <div key={item.id}>
          {/* <div key={item.id} className={cx(card({ p: "4", shadow: "sm" }))}> */}
            <h3 className={css({ fontSize: "lg", fontWeight: "bold" })}>{item.name}</h3>
            <p className={css({ color: "gray.600" })}>Source: {item.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
