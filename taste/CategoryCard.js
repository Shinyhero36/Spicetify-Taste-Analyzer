class CategoryCard extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      cover: null,
    };
  }

  componentDidMount() {
    this.getCover();
  }

  /**
   * Go through artists and look for a cover matching the genre
   */
  getCover() {
    for (let i = 0; i < userInfo.artists.allTime.length; i++) {
      if (userInfo.artists.allTime[i].genres.includes(this.props.name)) {
        this.setState({
          cover: userInfo.artists.allTime[i].images[0].url,
        });
        break;
      }
    }
  }

  render() {
    return react.createElement(
      "div",
      {
        className: "Z35BWOA10YGn5uc9YgAp",
      },
      react.createElement(
        "div",
        {
          className: "g3f_cI5usQX7ZOQyDtA9",
          draggable: true,
        },
        react.createElement(
          "div",
          { className: "jvWzgRWM_y_9FFTYRCcB" },
          react.createElement(
            "div",
            {
              className: "zXwER4Lsqq_e7fVVaPkZ",
            },
            react.createElement("img", {
              "aria-hidden": false,
              draggable: false,
              loading: "lazy",
              src: this.state.cover,
              alt: null,
              className: "main-image-image WWDxafTPs4AgThdcX5jN",
            })
          )
        ),
        react.createElement(
          "div",
          { className: "Tzzq1pG_inwo_oSOdyjb" },
          react.createElement(
            "a",
            {
              draggable: false,
              title: this.props.name,
              href: null,
            },
            react.createElement(
              "p",
              {
                className: "EzRmGRncgnv1zFgF4dqE main-type-balladBold",
                as: "p",
              },
              this.props.name
            )
          )
        ),
        react.createElement("div", { className: "jb9xD5ECTqKFK02qe3HZ" })
      )
    );
  }
}
