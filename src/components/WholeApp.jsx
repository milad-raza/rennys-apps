import React, { useState } from 'react';
import AllData from './AllData';

export default function WholeApp() {

  const [click,setClick] = useState(false)

  const handleClick = (e) => {
    setClick(e.target.textContent);
  }
  const one = "Channels";
  const two = "Dialer";
  const three = "Optimization";
  const four = "Reporting"
  const five = "Voice Analytics";

  const handlefalse = () => {
    setClick(false)
  }

    return (
      <div>
        <div className="flex-container">
          <nav className="nav-categories">
            <h2 onClick={handlefalse}>Categories</h2>

            <ul className="nav-menu">
              <li
                className={click === one ? "active" : ""}
                onClick={handleClick}
              >
                <span>Channels</span>
              </li>
              <li
                className={click === two ? "active" : ""}
                onClick={handleClick}
              >
                <span>Dialer</span>
              </li>
              <li
                className={click === three ? "active" : ""}
                onClick={handleClick}
              >
                <span>Optimization</span>
              </li>
              <li
                className={click === four ? "active" : ""}
                onClick={handleClick}
              >
                <span>Reporting</span>
              </li>
              <li
                className={click === five ? "active" : ""}
                onClick={handleClick}
              >
                <span>Voice Analytics</span>
              </li>
            </ul>
          </nav>
          <AllData navdata = {click} />
        </div>
      </div>
    );
}
