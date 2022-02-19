class Shelf extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      items: [],
      itemShown: 7,
      text: "Show more",
      style: this.props.style ? this.props.style : {},
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
        className: "main-shelf-shelf",
        "aria-label": this.props.description,
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
            ),
            this.props.description &&
              react.createElement(
                "p",
                {
                  className: "main-type-mesto",
                  as: "p",
                  style: {
                    color: "var(--spice-subtext)",
                  },
                },
                this.props.description
              )
          ),
          react.createElement(
            "a",
            {
              draggable: false,
              className: "main-seeAll-link main-shelf-seeAll",
              onClick: () => {
                History.push(this.props.pathTo);
              },
            },
            this.props.showBtn &&
              react.createElement(
                "span",
                {
                  className: "main-type-minuetBold",
                  as: "span",
                },
                this.state.text
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
            ...this.state.style,
          },
        },

        this.state.items.slice(0, this.state.itemShown)
      )
    );
  }
}
