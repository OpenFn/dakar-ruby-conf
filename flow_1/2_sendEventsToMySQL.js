upsertMany('events', state => state.MYSQLEvents);

fn(state => {
  console.log(state);
  return state;
});
