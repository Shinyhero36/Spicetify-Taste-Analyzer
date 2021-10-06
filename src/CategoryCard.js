class CategoryCard extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  render() {
    return react.createElement(
      "a",
      {
        draggable: false,
        className: "x-categoryCard-CategoryCard",
        onClick: (event) => {
          // History.push(`/genre/${this.props.name}`);
          showNotification("You can't go over there at the moment");
          // event.preventDefault();
        },
        style: {
          // TODO: Random color base on the color palette of the cover
          backgroundColor: "rgb(36, 133, 106)",
        },
      },
      react.createElement(
        "div",
        {},
        react.createElement("img", {
          "aria-hidden": false,
          draggable: false,
          loading: "lazy",
          src: "https://i.scdn.co/image/567158eb895ad26718a814345af0fc43ee785ec5",
          alt: "",
          className: "main-image-image x-categoryCard-image",
        }),
        react.createElement(
          "h3",
          {
            className: "x-categoryCard-title",
            style: {
              textTransform: "capitalize",
            },
          },
          this.props.name
        )
      )
    );
  }
}
