sql(state => `SELECT distinct(event_type) FROM events`, {
  writeSql: true,
  execute: true,
});

fn(state => {
  const event_types = state.response.body.rows.map(row => row.event_type);
  return { ...state, eventTypes: event_types };
});

fn(state => {
  console.log(state.eventTypes);
  return state;
});

each('eventTypes[*]', state => {
  fn(state => {
    const event_type = state.data;
    sql(state => `SELECT * FROM events WHERE event_type = '${state.data}'`, {
      writeSql: true,
      execute: true,
    });

    return { ...state, event_type: state.response.body.rows };
  })(state);
});
