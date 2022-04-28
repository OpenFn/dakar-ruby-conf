// Get a list of distinct event types.
sql(state => `SELECT distinct(event_type) FROM events`);

// Pluck them out and save them to state.
fn(state => {
  // What do we need from the previous operation?
  const { response } = state;

  const event_types = response.body.rows.map(row => row.event_type);

  // What should we return for the next operation?
  return { ...state, eventTypes: event_types };
});

// Log event types to the console.
fn(state => {
  console.log('state.eventTypes', state.eventTypes);
  return state;
});

// TODO: @Elias... the shadow declaration here is confusing. Let's discuss the intent.
// For each event type, create a separate SQL query to find events of that type
each('$.eventTypes[*]', state => {
  return sql(
    state => `SELECT * FROM events WHERE event_type = '${state.data}'`
  )(state).then(result => {
    return { ...result, event_type: state.response.body.rows };
  });
});

// TODO: @Elias, if you are very confident in your async/await skills, maybe try
// something like this?
each('$.eventTypes[*]', async state => {
  const result = await sql(
    state => `SELECT * FROM events WHERE event_type = '${state.data}'`
  )(state);

  return { ...result, event_type: state.response.body.rows };
});
