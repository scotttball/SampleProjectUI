const React = require('react');
const ReactDOM = require('react-dom');

// activityFeed
const App = React.createClass({
  getInitialState () {
    return {
      data: []
    };
  },

  componentWillMount () {
    fetch('https://nuvi-challenge.herokuapp.com/activities')
      .then(function (response) {
        return response.json();
      }).then(function (json) {
        this.setState({
          data: json
        });
      }.bind(this)).catch(function (ex) {
        console.error('parsing failed', ex);
      });
  },

  render () {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Activity Feed</h2>
        {this.state.data.map((activity) => <ActivityItem activity={activity} key={activity.id} />)}
      </div>
    );
  }
});

const styles = {
  container: {
    position: 'flex',
    alignItems: 'center'
  },
  header: {
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    margin: '20px 300px',
    border: '1px solid black',
    padding: 20
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: '50%',
    backgroundSize: 'cover'
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
    flexGrow: 1
  },
  description: {
    textTransform: 'uppercase',
    borderBottom: '1px solid blue'
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-inbetween'
  },
  icon: {
    padding: 3,
    fontSize: 16
  },
  activity: {
    marginBottom: 2
  },
  details: {
    display: 'flex'
  },
  provider: {
    textTransform: 'uppercase',
    fontSize: 8,
    flexGrow: 1
  },
  misc: {
    display: 'flex'
  },
  message: {
    textAlign: 'center',
    padding: '30px 0px'
  },
  actionButtons: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-inbetween'
  },
  buttons: {
    flexGrow: 1,
    textAlign: 'center',
    border: '1px solid blue',
    padding: 10,
    margin: '0px 5px'
  }
};



const ActivityItem = ({ activity }) => (
  <div style={styles.cardContainer}>
    <div style={styles.card}>
      <div style={styles.misc}>
        <div style={styles.provider}>Source: {activity.provider}</div><div style={styles.date}>{activity.activity_date}</div>
      </div>
      <div style={styles.profile}>
        <a href={activity.actor_url} style={styles.link}><h2 className='mdl-card__title-text'>{activity.actor_name}</h2></a>
        <div style={Object.assign({}, styles.avatar, { backgroundImage: 'url(' + activity.actor_avator + ')' })}></div>
      </div>
      <div style={styles.description}>{activity.actor_description}</div>
      <div style={styles.details}>
        <a href={activity.activity_url} style={styles.link}><div style={styles.message}>{activity.activity_message}</div></a>
      </div>
      <div style={styles.actionButtons}>
        <div style={styles.buttons}><span style={styles.activity}>{activity.activity_likes} Likes</span><i className='material-icons' style={styles.icon}>thumb_up</i></div>
        <div style={styles.buttons}><span style={styles.activity}>{activity.activity_comments} Comments</span><i className='material-icons' style={styles.icon}>comment</i></div>
        <div style={styles.buttons}><span style={styles.activity}>{activity.activity_shares} Shares</span><i className='material-icons' style={styles.icon}>share</i></div>
      </div>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
