class Carousel extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    let cards;
    cards = this.props.items.map((item) => {
      return react.createElement(this.props.component, item);
    });

    this.setState({ items: cards });
  }

  render() {
    return react.createElement(
      "section",
      {
        className: " x-carousel-carousel",
        "aria-label": this.props.title,
      },
      react.createElement(
        "div",
        {
          className: "x-carousel-header",
        },
        react.createElement(
          "h2",
          {
            className: "x-carousel-title main-type-canon",
          },
          this.props.title
        )
      ),
      react.createElement(
        "div",
        {
          className: "x-carousel-carouselAnchor",
        },
        react.createElement(
          "div",
          {
            className: "x-carousel-gridScrollWrapper",
          },
          react.createElement(
            "div",
            {
              style: {
                "--column-width": "181px",
                "--column-count": this.state.items.length,
                "--minimumColumnWidth": "180px",
              },
              className:
                "main-gridContainer-gridContainer x-carousel-carouselGrid main-gridContainer-fixedWidth",
            },
            this.state.items
          )
        )
      )
    );
  }
}
