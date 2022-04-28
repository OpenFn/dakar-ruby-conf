fn((state) => {
  return list(state.homeFolder)(state).then((response) => {
    console.log(`There are ${response.data.length} files.`);
    console.log(response.data);
    return response;
  });
});
