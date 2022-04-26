sql(state => `SELECT * FROM events`, { writeSql: true });

fn(state => {
  console.log('This is the result of the SQL query', state.response.body.rows);
  return state;
});

fn(state => {
  const postgresEvents = state.response.body.rows;
  const mysqlEvents = postgresEvents.map(event => ({
    event_type: event.event_type,
    sub_event_type: event.sub_event_type,
    interaction: event.interaction,
    actor: event.actor1,
    locality: event.location,
  }));
  return { ...state, postgresEvents, mysqlEvents };
});
