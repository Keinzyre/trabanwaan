import { Container, Divider, Fab, Grid, Typography } from "@mui/material";
import ExploreLayout from "../Components/ExploreLayout";
import Filter from "../Components/Filter";
import ExploreIcon from "../public/undraw_hire_re_gn5j.svg";
import SvgIcon from "@mui/material/SvgIcon";
import { useEffect, useState } from "react";

function Explore(props) {
  /*   const initializeSearchValue = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("searchValue")) ?? [];
    }
  };
  console.log(initializeSearchValue(), "initialized Result"); */

  const [searchEmpty, setSearchEmpty] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  useEffect(() => {
    const initializedResult =
      JSON.parse(localStorage.getItem("searchValue")) ?? [];
    setSearchResult(initializedResult);
  }, []);
  useEffect(() => {
    if (!searchResult.length) {
      setSearchEmpty(true);
      /* console.log(searchResult, "ifcheck no result"); */
    }
    if (searchResult.length) {
      setSearchEmpty(false);
      /* console.log(searchResult, "ifcheck has result"); */
    }
  }, [searchResult]);

  console.log(searchResult, "result explore page");
  /*   const saveFiltersHandler = (filteredResults) => {
    if (!filteredResults.length) {
      setSearchEmpty(true);
      console.log("ifcheck no result");
    }
    if (filteredResults.length) {
      setSearchEmpty(false);
      setSearchResult([filteredResults]);
      console.log("ifcheck has result");
    }
    console.log(filteredResults, "explore page");
    console.log(searchResult, "searchresult passing data");
  }; */

  return (
    <>
      <Container maxWidth="md" sx={{ p: 2, justifyContent: "center" }}>
        {searchEmpty && (
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <SvgIcon
              component={ExploreIcon}
              inheritViewBox
              sx={{ fontSize: 400 }}
            />
            <Typography variant="h6">Try searching for your worker.</Typography>
          </Grid>
        )}
        {!searchEmpty &&
          searchResult.map((item) => (
            <ExploreLayout key={item._id} {...item} />
          ))}
      </Container>
      <Filter onSaveFilters={setSearchResult} />
    </>
  );
}

export default Explore;
