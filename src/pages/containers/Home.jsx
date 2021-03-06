import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Post from '../../posts/containers/Post';
import Loading from '../../shared/components/Loading';

import styles from './Page.css';

import actions from '../../actions';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.initialFetch();

    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  async initialFetch() {
    await this.props.actions.postsNextPage();
    this.setState({ loading: false });
  }

  handleScroll() {
    if (this.state.loading) return null;

    const scrolled = window.scrollY;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.body.clientHeight;

    if (!(scrolled + viewportHeight + 300 >= fullHeight)) {
      return null;
    }

    return this.setState({ loading: true }, async () => {
      try {
        await this.props.actions.postsNextPage();
        this.setState({ loading: false });
      } catch (error) {
        console.error(error);
        this.setState({ loading: false });
      }
    });
  }

  render() {
    return (
      <section name="Home" className={styles.section}>
        <section className={styles.list}>
          <ReactCSSTransitionGroup
            transitionName={{
              enter: styles.enter,
              enterActive: styles.enterActive,
              appear: styles.appear,
              appearActive: styles.appearActive,
              leave: styles.leave,
              leaveActive: styles.leaveActive,
            }}
            transitionAppear
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.props.posts
              .map(post => <Post key={post.get('id')} {...post.toJS()} />)
              .toArray()
            }
          </ReactCSSTransitionGroup>
          {this.state.loading && (
            <Loading />
          )}
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  posts: PropTypes.shape({
    size: PropTypes.number,
    map: PropTypes.func,
  }).isRequired,
};

function mapStateToProps(state) {
  return {
    posts: state.get('posts').get('entities'),
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
