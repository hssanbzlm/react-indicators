const END_POINTS = {
  data_end_point: "http://localhost:3001/Data",
  professions_end_point: "http://localhost:3001/Professions",
  areas_end_point: "http://localhost:3001/Areas",
};
if (process.env.NODE_ENV === "production") {
  //update env variables
}

export default END_POINTS;
