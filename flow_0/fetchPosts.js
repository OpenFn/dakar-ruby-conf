// Get the data from the system
get('/posts');

fn(state => {
  // Pluck out what you need from state at the top.
  const { data } = state;

  console.log(
    'This is what state.data look like after the get operation',
    JSON.stringify(data, null, 2)
  );

  // Do whatever you want with the data here
  const customPosts = data
    .filter(({ body }) => body.length > 15)
    .map(({ body }) => ({
      title: `The new title is '${body.slice(0, 10)}'.`,
      body,
    }));

  // Then return a new state based on the previous one and
  // result of the data transformation
  return { ...state, customPosts };
});

// Send the new data to the same system
post('/posts', { body: state => state.customPosts });
