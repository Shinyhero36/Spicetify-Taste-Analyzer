class ShelfGenres extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      items: [],
      itemShown: 6,
      style: this.props.style ? this.props.style : {},
    };
  }

  componentDidMount() {
    this.setState({
      items: this.props.collections[0].items.map((item) => {
        return react.createElement(this.props.component, item);
      }),
    });
  }

  render() {
    return react.createElement(
      "section",
      {
        className: "main-shelf-shelf",
        style: {
          "min-height": "0px",
        },
      },
      react.createElement(
        "div",
        {
          className: "main-shelf-header",
        },
        react.createElement(
          "div",
          {
            className: "main-shelf-topRow",
          },
          react.createElement(
            "div",
            {
              className: "main-shelf-titleWrapper",
            },
            react.createElement(
              "h2",
              {
                className: "main-type-canon",
                as: "h2",
              },
              react.createElement(
                "a",
                {
                  className: "main-shelf-title",
                  draggable: "false",
                  href: "#",
                },
                this.props.title
              )
            )
          )
        )
      ),
      react.createElement(
        "div",
        {
          className: `main-gridContainer-gridContainer main-shelf-shelfGrid${
            this.showBtn === true ? " main-shelf-showAll" : ""
          }`,
          style: {
            "--minimumColumnWidth": "180px",
            "--column-width": "207px",
            "--column-count": "5",
            "--grid-gap": "24px",
            ...this.state.style,
          },
        },
        this.state.items.slice(0, this.state.itemShown)
      )
    );
  }
}
