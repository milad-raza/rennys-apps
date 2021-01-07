import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { useData } from "../context/dataProvider/dataProvider.useData";

export default function ChangableData(props) {
  const { data } = useData();
  const [plansAdd, setPlansAdd] = useState([{ update: 0, val: data }]);
  const navdata = props.navdata;
  const [nav, setNav] = useState([]);
  const search = props.search;
  const [result, setResult] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [final, setFinal] = useState(data);
  const [activePage, setCurrentPage] = useState(1);
  const [searchPage, setCurrentSearchPage] = useState(1);

  // ascending order by ABC

  function sortByProperty(property) {
    return function (a, b) {
      if (a[property] > b[property]) return 1;
      else if (a[property] < b[property]) return -1;

      return 0;
    };
  }
  data.sort(sortByProperty("name"));

  // plans checking

  useEffect(() => {
    setPlansAdd([]);
    async function wait() {
      await data.map((val, index) => {
        let update = val.subscriptions[0].price;
        if (val.subscriptions.length >= 2) {
          update = val.subscriptions[1].price + update;
        }
        if (val.subscriptions.length >= 3) {
          update = val.subscriptions[2].price + update;
        }
        setPlansAdd((plansAdd) => [...plansAdd, { update, val: [val] }]);
      });
    }
    wait();
  }, []);

  // for navbar

  function NavFunc() {
    setNav([]);
    final.map((value, index) => {
      const alldata = value;

      value.categories.map((val, index) => {
        if (val.match(navdata)) {
          return setNav((nav) => [...nav, alldata]);
        }
      });
    });
  }

  useEffect(() => {
    NavFunc();
  }, [navdata]);

  function searchFunc() {
    setResult([]);
    const notBlank = search !== "" && search !== " ";

    if (notBlank === true) {
      const search1 = search.toLowerCase();

      for (var i = 0; i < final.length; i++) {
        for (var key in final[i]) {
          if (typeof final[i][key] == "string") {
            final[i][key] = final[i][key].toLowerCase();
          }
        }
      }

      final.map((value, index) => {
        if (value.name.match(search1) || value.description.match(search1)) {
          setResult((result) => [...result, value]);
        }
      });
    }
  }

  useEffect(() => {
    searchFunc();

    if (search !== "") {
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  }, [search]);

  // For All Items With Pagination

  const itemsPerPage = 3;

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = final.slice(indexOfFirstItem, indexOfLastItem);

  const renderItems = currentItems.map((app, index) => {
    return (
      <li key={app.id}>
        <div className="app-item">
          <div className="box-info">
            <div className="box-info--content">
              <div className="description">
                <h1 className="capitalword">{app.name}</h1>
                <p className="capitalfirst">{app.description}</p>
              </div>
              <div className="tags">
                {app.categories.map((value, index) => (
                  <span key={index}>
                    {value}
                    {app.categories[index + 1] ? " / " : ""}{" "}
                  </span>
                ))}
              </div>
            </div>
            <div className="box-info--footer">
              <ul>
                {app.subscriptions.map((value, index) => (
                  <li key={index}>
                    <span>{value.name}</span>{" "}
                    <h3>
                      {value.price}
                      <sup>€</sup>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </li>
    );
  });

  // For Searc With Pagination

  const indexOfLastSearchItem = searchPage * itemsPerPage;
  const indexOfFirstSearchItem = indexOfLastSearchItem - itemsPerPage;

  const searchItems = result.slice(
    indexOfFirstSearchItem,
    indexOfLastSearchItem
  );

  const renderSearchItems = searchItems.map((app, index) => {
    return (
      <li key={app.id}>
        <div className="app-item">
          <div className="box-info">
            <div className="box-info--content">
              <div className="description">
                <h1 className="capitalword">{app.name}</h1>
                <p className="capitalfirst">{app.description}</p>
              </div>
              <div className="tags">
                {app.categories.map((value, index) => (
                  <span key={index}>
                    {value}
                    {app.categories[index + 1] ? " / " : ""}{" "}
                  </span>
                ))}
              </div>
            </div>
            <div className="box-info--footer">
              <ul>
                {app.subscriptions.map((value, index) => (
                  <li key={index}>
                    <span>{value.name}</span>{" "}
                    <h3>
                      {value.price}
                      <sup>€</sup>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </li>
    );
  });

  // For NavData
  const sidebar = nav.map((app, index) => {
    return (
      <li key={app.id}>
        <div className="app-item">
          <div className="box-info">
            <div className="box-info--content">
              <div className="description">
                <h1 className="capitalword">{app.name}</h1>
                <p className="capitalfirst">{app.description}</p>
              </div>
              <div className="tags">
                {app.categories.map((value, index) => (
                  <span key={index}>
                    {value}
                    {app.categories[index + 1] ? " / " : ""}{" "}
                  </span>
                ))}
              </div>
            </div>
            <div className="box-info--footer">
              <ul>
                {app.subscriptions.map((value, index) => (
                  <li key={index}>
                    <span>{value.name}</span>{" "}
                    <h3>
                      {value.price}
                      <sup>€</sup>
                    </h3>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </li>
    );
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchPageChange = (pageNumber) => {
    setCurrentSearchPage(pageNumber);
  };

  useEffect(() => {
    async function wait() {
      // for sorting ascending order in number
      plansAdd.sort(sortByProperty("update"));
      setFinal(plansAdd);

      setFinal([]);
      plansAdd.map((values) => {
        setFinal((final) => [...final, values.val[0]]);
      });
    }
    wait();
  }, [plansAdd]);

  return (
    <>
      {showSearch === false ? (
        navdata ? (
          <ul>{sidebar}</ul>
        ) : (
          <div>
            <ul>{renderItems}</ul>
            <Pagination
              activePage={activePage}
              itemsCountPerPage={3}
              totalItemsCount={data.length}
              pageRangeDisplayed={data.length}
              onChange={handlePageChange}
              prevPageText="&lt;"
              nextPageText="&gt;"
              hideFirstLastPages="true"
            />
          </div>
        )
      ) : result.length < 1 ? (
        <h1>Item Not Found</h1>
      ) : (
        <div>
          <ul>{renderSearchItems}</ul>
          <Pagination
            activePage={searchPage}
            itemsCountPerPage={3}
            totalItemsCount={result.length}
            pageRangeDisplayed={result.length}
            onChange={handleSearchPageChange}
            prevPageText="&lt;"
            nextPageText="&gt;"
            hideFirstLastPages="true"
          />
        </div>
      )}
    </>
  );
}
