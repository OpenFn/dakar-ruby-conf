sql(state => `SELECT * FROM events`, {
  writeSql: true,
  execute: true,
});

fn(state => {
  console.log('This is the result of the SQL query', state.response.body.rows);
  return state;
});

fn(state => {
  const PGSQLEvents = state.response.body.rows;
  const MySQLEvents = PGSQLEvents.map(event => ({
    event_type: event.event_type,
    sub_event_type: event.sub_event_type,
    interaction: event.interaction,
    actor: event.actor1,
    locality: event.location,
  }));
  return { ...state, PGSQLEvents, MySQLEvents };
});

// each('events[*]', interator => {
//   console.log(interator.data);
//   return interator;
// });
