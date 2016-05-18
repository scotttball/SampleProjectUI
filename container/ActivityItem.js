const ActivityItem = ({ activity }) => (
  _actionButtons (actionType, activity.id) {
    fetch('https://nuvi-challenge.herokuapp.com/activities/' + activity.id, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      actionType: i++
    })
  },

  render () {
    return (
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
            <div style={styles.buttons} className='waves-effect waves-light btn' onClick={this._actionButtons.bind(null, activity.activity_likes)}><span style={styles.activity}>{activity.activity_likes} Likes</span><i className='material-icons' style={styles.icon}>thumb_up</i></div>
            <div style={styles.buttons} onClick={this._actionButtons.bind(null, activity.activity_comments)}><span style={this._addComments}>{activity.activity_comments} Comments</span><i className='material-icons' style={styles.icon}>comment</i></div>
            <div style={styles.buttons} onClick={this._actionButtons.bind(null, activity.activity_shares)}><span style={this._addShares}>{activity.activity_shares} Shares</span><i className='material-icons' style={styles.icon}>share</i></div>
          </div>
        </div>
      </div>
    );
  }
);
