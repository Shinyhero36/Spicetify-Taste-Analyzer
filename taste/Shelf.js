class Shelf extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      items: [],
      itemShown: 7,
      text: "Show more",
      style: this.props.style ? this.props.style : {},
      selectedFilter: this.props.collections[0].id,
    };
  }

  componentDidMount() {
    let cards = [];
    cards = this.props.collections
      .filter((collection) => collection.id === this.state.selectedFilter)[0]
      .items.map((item) => {
        return react.createElement(this.props.component, item);
      });

    this.setState({ items: cards });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.selectedFilter !== this.state.selectedFilter)
      this.componentDidMount();
  }

  filtersDOM() {
    if (this.props.collections.length > 1) {
      return react.createElement(
        "div",
        {
          className: "hWGxHSAKACFWXowXPDTP",
        },
        react.createElement(
          "div",
          {
            className: "Jr6tcq7gSdKFSqofza3T",
          },
          this.props.collections.map((collection) => {
            return react.createElement(
              "button",
              {
                className: "Chip__ChipComponent-ry3uox-0 jquShk",
                "aria-checked": this.state.selectedFilter === collection.id,
                onClick: () => {
                  this.setState({
                    selectedFilter: collection.id,
                  });
                },
              },
              react.createElement(
                "div",
                {
                  className: `ChipInner-sc-1ly6j4j-0 ${
                    this.state.selectedFilter === collection.id
                      ? "cWsvKZ encore-inverted-light-set"
                      : "dwbjqG"
                  }`,
                },
                collection.title
              )
            );
          })
        )
      );
    } else {
      return null;
    }
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
          ),
          react.createElement(
            "a",
            {
              draggable: false,
              className: "main-seeAll-link main-shelf-seeAll",
              onClick: () => {
                History.push(
                  this.props.pathTo + "-" + this.state.selectedFilter
                );
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
      this.filtersDOM(),
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
