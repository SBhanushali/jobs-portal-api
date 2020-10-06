exports.searchParamsToQueryObj = (location) => {
  queryObj = {};
  const searchParams = new URLSearchParams(location);
  for (let param of searchParams) {
    const [key, value] = param;
    queryObj[`location.${key}`] = value;
  }
  return queryObj;
};
