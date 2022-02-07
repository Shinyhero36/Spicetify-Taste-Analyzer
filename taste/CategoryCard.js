class CategoryCard extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      cover: {
        art: null,
        color: null,
      },
    };
    this.getCover();
  }

  /**
   * Go through artists and look for a cover matching the genre
   */
  getCover() {
    for (let i = 0; i < userInfo.artists.allTime.length; i++) {
      if (userInfo.artists.allTime[i].genres.includes(this.props.name)) {
        colorExtractor(userInfo.artists.allTime[i].uri).then((color) => {
          this.setState({
            cover: {
              art: userInfo.artists.allTime[i].images[0].url,
              color: color.DARK_VIBRANT,
            },
          });
        });
        break;
      }
    }
  }

  render() {
    return this.state.cover.color === null
      ? null
      : react.createElement(
          "a",
          {
            draggable: false,
            className: "x-categoryCard-CategoryCard",
            // href: "/genre/hiphop-page",
            style: {
              backgroundColor: this.state.cover.color, // Change color
            },
          },
          react.createElement(
            "div",
            null,
            react.createElement("img", {
              "aria-label": "false",
              draggable: false,
              loading: "lazy",
              // src: "https://i.scdn.co/image/ab67706f000000029bb6af539d072de34548d15c",
              src: this.state.cover.art,
              alt: "",
              className: "main-image-image tV9cjMpTPaykKsn2OVsw",
            }),
            react.createElement(
              "h3",
              {
                className: "i2yp6pOoZpYZLd5QWguN",
              },
              this.props.name
            )
          )
        );
  }
}
