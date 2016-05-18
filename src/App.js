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

// NOT WORKING
  _handleCommentClick (id) {
    fetch('https://nuvi-challenge.herokuapp.com/activities', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        activity_comments: 1
      })
    });
  },

  render () {
    return (
      <div style={styles.container}>
        <h2 style={styles.header}>Activity Feed</h2>
        {this.state.data.map((activity) => <ActivityItem activity={activity} key={activity.id} onCommentClick={this._handleCommentClick} />)}
      </div>
    );
  }
});

const styles = {
  container: {
    position: 'flex',
    alignItems: 'center',
    fontFamily: 'Open Sans, Helvetica, Arial, sans-serif',
    backgroundColor: 'rgb(100, 155, 210)'
  },
  header: {
    textTransform: 'uppercase',
    textAlign: 'center'
  },
  card: {
    flex: 1,
    margin: '20px 300px',
    border: '1px solid white',
    padding: 20,
    backgroundColor: 'white'
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
  button: {
    display: 'block',
    textAlign: 'center',
    flexGrow: 1,
    padding: '20px 30px',
    textTransform: 'uppercase',
    backgroundColor: '#00187A',
    color: '#fff',
    cursor: 'pointer',
    borderWidth: '3px',
    borderStyle: 'solid',
    borderColor: '#00187A',
    transition: 'all .1s'
  }
};

const ActivityItem = ({ activity, onCommentClick, onLikeClick, onShareClick }) => (
  <div style={styles.cardContainer}>
    <div style={styles.card}>
      <div style={styles.misc}>
        <div style={styles.provider}>Source: {activity.provider}</div><div style={styles.date}>{activity.activity_date}</div>
      </div>
      <div style={styles.profile}>
        <a href={activity.actor_url} style={styles.link}><h2>{activity.actor_name}</h2></a>
        <div style={Object.assign({}, styles.avatar, { backgroundImage: 'url(' + activity.actor_avator + ')' })}></div>
      </div>
      <div style={styles.description}>{activity.actor_description}</div>
      <div style={styles.details}>
        <a href={activity.activity_url} style={styles.link}><div style={styles.message}>{activity.activity_message}</div></a>
      </div>
      <div style={styles.actionButtons}>
        <div onClick={onCommentClick} style={styles.button}><span style={styles.activity}>{activity.activity_likes} Likes</span><i className='material-icons' style={styles.icon}>thumb_up</i></div>
        <div onClick={onLikeClick} style={styles.button}><span style={styles.activity}>{activity.activity_comments} Comments</span><i className='material-icons' style={styles.icon}>comment</i></div>
        <div onClick={onShareClick} style={styles.button}><span style={styles.activity}>{activity.activity_shares} Shares</span><i className='material-icons' style={styles.icon}>share</i></div>
      </div>
    </div>
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));
