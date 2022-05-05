class Card extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);

    const uriObj = URI.fromString(this.uri);
    this.uriType = uriObj.type;
    this.menuType = "div";
  }

  cover() {
    const uri = URI.fromString(this.props.uri);
    const uriType = uri.type;

    if (uriType === URI.Type.TRACK) {
      return this.props.album.images[0].url;
    } else if (uriType === URI.Type.ARTIST) {
      return this.props.images[0].url;
    } else {
      // console.log("TYPE: ", uriType);
    }
  }

  title() {
    const uri = URI.fromString(this.props.uri);
    const uriType = uri.type;

    if (uriType === URI.Type.TRACK) {
      return this.props.name;
    } else if (uriType === URI.Type.ARTIST) {
      return this.props.name;
    } else {
      // console.log("TYPE: ", uriType);
    }
  }

  subtitle() {
    const uri = URI.fromString(this.props.uri);
    const uriType = uri.type;

    if (uriType === URI.Type.TRACK) {
      const artists = this.props.artists.map((artist) => {
        return artist.name;
      });
      return artists.join(", ");
    } else if (uriType === URI.Type.ARTIST) {
      const genres = this.props.genres;
      return genres.join(", ");
    }
  }

  play(event) {
    Spicetify.Player.playUri(this.uri, this.context);
    event.stopPropagation();
  }

  render() {
    return react.createElement(
      Spicetify.ReactComponent.RightClickMenu || "div",
      {
        menu: react.createElement(this.menuType, { uri: this.props.uri }),
      },
      react.createElement(
        "div",
        {
          className: "main-card-card",
        },
        react.createElement(
          "div",
          {
            className: "main-card-draggable",
            draggable: true,
          },
          react.createElement(
            "div",
            {
              className: "main-card-imageContainer",
            },
            react.createElement(
              "div",
              {
                className:
                  "main-cardImage-imageWrapper main-cardImage-roundedCorners",
              },
              react.createElement(
                "div",
                {
                  className: "",
                },
                react.createElement("img", {
                  "aria-hidden": false,
                  draggable: false,
                  loading: "lazy",
                  src: this.cover(),
                  alt: "",
                  className:
                    "main-image-image main-cardImage-image main-cardImage-roundedCorners",
                })
              )
            )
          ),
          react.createElement(
            "div",
            {
              className: "main-card-cardMetadata",
            },
            react.createElement(
              "a",
              {
                className: "main-cardHeader-link",
                draggable: false,
                dir: "auto",
              },
              react.createElement(
                "div",
                {
                  className: "main-cardHeader-text main-type-balladBold",
                  as: "div",
                },
                this.title()
              )
            ),
            react.createElement(
              "div",
              {
                class: "main-cardSubHeader-root main-type-mesto",
                as: "div",
                style: {
                  color: "var(--spice-subtext)",
                },
              },
              react.createElement("span", null, this.subtitle())
            )
          )
        )
      )
    );
  }
}
