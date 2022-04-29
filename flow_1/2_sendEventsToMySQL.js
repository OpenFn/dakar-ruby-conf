upsertMany('events', state => state.mysqlEvents);

fn(state => {
  console.log(state.data);
  console.log("Great job. We're all done here 👍");
  return state;
});
