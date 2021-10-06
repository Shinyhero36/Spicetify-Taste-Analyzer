class Shelf extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      items: [],
      showAll: false,
      text: "Show more",
    };
    setInterval(this.tick, 1000);
  }

  tick() {
    console.log("tic tac");
  }

  componentDidMount() {
    let cards;
    cards = this.props.items.map((item) => {
      return react.createElement(this.props.component, item);
    });

    this.setState({ items: cards });
  }

  toggleShowAll() {
    this.setState({
      showAll: !this.state.showAll,
      text: this.state.showAll ? "Show more" : "Show less",
    });
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
                this.toggleShowAll();
                showNotification("I can't display more at the moment.");
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
            this.state.showAll === true ? " main-shelf-showAll" : ""
          }`,
          style: {
            "--minimumColumnWidth": "180px",
          },
        },

        this.state.items
      )
    );
  }
}
