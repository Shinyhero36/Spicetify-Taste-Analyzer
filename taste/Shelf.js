class Shelf extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      items: [],
      itemShown: 7,
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

  setCardsToShow(key) {
    const newCollection = this.props.collections.filter(
      (collection) => collection.id === key
    );

    if (newCollection)
      this.setState({
        items: newCollection[0].items.map((item) => {
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
          )
        )
      ),
      this.props.collections.length > 1 &&
        react.createElement(
          "div",
          {
            className: "hWGxHSAKACFWXowXPDTP",
          },
          react.createElement(
            "div",
            {
              className: "Jr6tcq7gSdKFSqofza3T",
              style: {
                gap: "12px",
                display: "flex",
                "margin-bottom": "1rem",
              },
            },
            this.sortBy.map((sBy) => {
              return react.createElement(
                "button",
                {
                  style: {
                    "border-radius": "var(--border-radius)",
                    "font-size": "12px",
                    "line-height": "16px",
                    "font-weight": "700",
                    "letter-spacing": "0.1em",
                    "text-transform": "uppercase",
                    "text-align": "center",
                    color: "var(--spice-text)",
                    "background-color": "initial",
                    padding: "7px 15px",
                    border: "1px solid var(--spice-text)",
                  },
                  onClick: () => this.setCardsToShow(sBy.key),
                },
                sBy.value
              );
            })
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
            "--column-count": "7",
            "--grid-gap": "24px",
            ...this.state.style,
          },
        },
        this.state.items.slice(0, this.state.itemShown)
      )
    );
  }
}
