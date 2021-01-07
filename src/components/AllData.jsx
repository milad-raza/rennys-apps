import React, { useState } from "react";
import ChangableData from "./ChangableData";

export default function AllData(props) {
  const [search, setSearch] = useState("");
  const handleChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <section className="apps-list">
      <header>
        <input
          type="text"
          placeholder="Search by App"
          value={search}
          onChange={handleChange}
        />
      </header>
      <ChangableData search={search} navdata={props.navdata} />
    </section>
  );
}
