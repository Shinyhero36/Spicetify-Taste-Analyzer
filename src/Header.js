class Header extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  render() {
    return react.createElement(
      "div",
      {
        className:
          "contentSpacing main-entityHeader-container main-entityHeader-nonWrapped EoWTHMHULkiBK_d7IeOO",
      },
      react.createElement(
        "div",
        {
          className: "main-entityHeader-headerText",
        },
        react.createElement(
          "span",
          {
            className: "main-entityHeader-title",
            draggable: true,
            dir: "auto",
          },
          react.createElement(
            "h1",
            {
              className: "main-type-bass",
              style: {
                padding: "0.08em 0px",
                fontSize: "96px",
                lineHeight: "96px",
                visibility: "visible",
                width: "100%",
              },
            },
            this.props.title
          )
        )
      )
    );
  }
}
