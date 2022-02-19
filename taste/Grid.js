class Grid extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(props, this);
  }

  renderItems() {
    return this.props.items.map((item) => {
      return react.createElement(this.props.component, item);
    });
  }
  render() {
    return react.createElement(
      "section",
      {
        className: "main-shelf-shelf",
        "aria-label": this.props.title,
      },
      react.createElement(
        "div",
        { className: "main-shelf-header" },
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
                className: "MfVrtIzQJ7iZXfRWg6eM main-type-canon",
                as: "h2",
                tabindex: "-1",
              },
              this.props.title
            )
          )
        ),
        react.createElement(
          "div",
          {
            className:
              "main-gridContainer-gridContainer main-shelf-shelfGrid main-shelf-showAll",
            style: {
              "--minimumColumnWidth": "180px",
              "--item-height": "80px",
            },
          },
          this.renderItems()
        )
      )
    );
  }
}
