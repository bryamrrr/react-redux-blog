import React, { Component } from 'react';
import Image from 'react-lazy-image';

import styles from './Page.css';

import api from '../../api';

class Gallery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      gallery: [],
    };
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const gallery = await api.gallery.getPage(1);
    this.setState({ loading: false, gallery });
  }

  render() {
    return (
      <section name="Gallery" className={styles.section}>
        <section>
          {this.state.gallery
            .map(image =>
              <Image
                source={image.url}
                alt=""
                width="600"
                height="600"
                offset={300}
              />,
            )
          }
        </section>
      </section>
    );
  }
}

export default Gallery;
