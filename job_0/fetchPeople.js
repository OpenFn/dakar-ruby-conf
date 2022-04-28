get("/posts");

fn((state) => {
  console.log(
    "This is what state.data look like after the get operation",
    JSON.stringify(state.data, null, 4)
  );

  const customPosts = state.data.map((post) => {
    return { title: post.title, body: post.body };
  });

  return { ...state, customPosts };
});

post("/posts", {
  body: (state) => state.customPosts,
});
