// Get the data from the system
get('/posts');

fn(state => {
  console.log(
    'This is what state.data look like after the get operation',
    JSON.stringify(state.data, null, 2)
  );

  // Do whatever you want with the data here
  const customPosts = state.data.map(post => {
    return { title: post.title, body: post.body };
  });

  // Then return a new state based on the previous one and
  // result of the data transformation
  return { ...state, customPosts };
});

// Send the new data to the same system
post('/posts', {
  body: state => state.customPosts,
});
