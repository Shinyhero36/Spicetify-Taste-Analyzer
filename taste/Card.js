class Card extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);

    const uriObj = URI.fromString(this.uri);
    this.href = uriObj.toURLPath(true);

    this.uriType = uriObj.type;
    switch (this.uriType) {
      case URI.Type.ALBUM:
      case URI.Type.TRACK:
        this.menuType = Spicetify.ReactComponent.AlbumMenu;
        break;
      case URI.Type.ARTIST:
        this.menuType = Spicetify.ReactComponent.ArtistMenu;
        break;
      case URI.Type.PLAYLIST:
      case URI.Type.PLAYLIST_V2:
        this.menuType = Spicetify.ReactComponent.PlaylistMenu;
        break;
      case URI.Type.SHOW:
        this.menuType = Spicetify.ReactComponent.PodcastShowMenu;
        break;
    }
    this.menuType = this.menuType || "div";
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
        menu: react.createElement(this.menuType, { uri: this.uri }),
      },
      react.createElement(
        "div",
        {
          className: "main-card-card",
          onClick: (event) => {
            History.push(this.href);
            event.preventDefault();
          },
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
            ),
            react.createElement(
              "div",
              {
                className: "main-card-PlayButtonContainer",
              },
              react.createElement(
                "button",
                {
                  className:
                    "main-playButton-PlayButton main-playButton-primary",
                  "aria-label": "Play",
                  style: {
                    "--size": "40px",
                  },
                  onClick: this.play.bind(this),
                },
                react.createElement(
                  "svg",
                  {
                    height: 16,
                    width: 16,
                    viewBox: "0 0 24 24",
                    ariaHidden: true,
                    role: "img",
                  },
                  react.createElement("polygon", {
                    points: "21.57 12 5.98 3 5.98 21 21.57 12",
                    fill: "currentColor",
                  })
                )
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
                href: "/show/145gf6QoEMM5e7RxaT3Msn",
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
