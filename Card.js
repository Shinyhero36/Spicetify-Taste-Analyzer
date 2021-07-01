class Card extends react.Component {
    constructor(props) {
        super(props);
        Object.assign(this, props.card);
        this.rank = props.rank;

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
        }
        this.menuType = this.menuType || "div";
    }

    play(event) {
        const api = Spicetify.Player.origin2 || Spicetify.PlaybackControl.playUri;
        api.playUri(this.uri);
        event.stopPropagation();
    }

    getSubtitle() {
        let subtitle;
        if (this.uriType === URI.Type.ARTIST) {
            subtitle = this.genres.map((genre) => {
                return react.createElement("span", null, genre);
            });
            // Insert commas between elements
            subtitle = subtitle.flatMap((el, i, arr) => (arr.length - 1) !== i ? [el, ", "] : el);
        } else if (this.uriType === URI.Type.TRACK) {
            subtitle = this.artists.map((artist) => {
                const artistHref = URI.from(artist.uri).toURLPath(true);
                return react.createElement("a", {
                    href: artistHref,
                    style: { color: "var(--spice-text)" },
                    onClick: (event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        History.push(artistHref);
                    },
                }, react.createElement("span", null, artist.name));
            });
            // Insert commas between elements
            subtitle = subtitle.flatMap((el, i, arr) => (arr.length - 1) !== i ? [el, ", "] : el);
        } else {
            subtitle = react.createElement("div", {
                className: "main-cardSubHeader-root main-type-mesto cardSubHeader",
                as: "div",
            }, react.createElement("span", null, "THIS IS A SUBTITLE xD"))
        }
        return react.createElement("div", {
            className: "cardSubHeader main-type-mesto",
        }, subtitle);
    }

    getCover() {
        if (this.uriType === URI.Type.TRACK || this.uriType === URI.Type.ALBUM) {
            return this.album.images[0].url
        } else if (this.uriType === URI.Type.ARTIST) {
            return this.images[0].url
        } else {
            return null
        }
    }

    setPopularityBadge() {
        if (this.popularity <= 20) {
            return "badge-C-tier";
        } else if (this.popularity <= 40) {
            return "badge-B-tier";
        } else if (this.popularity <= 60) {
            return "badge-A-tier";
        } else if (this.popularity <= 80) {
            return "badge-S-tier";
        } else {
            return "badge-SS-tier";
        }
    }

    getTitle() {
        return this.name;
    }

    render() {
        let detail = [];

        return react.createElement(Spicetify.ReactComponent.RightClickMenu || "div", {
            menu: react.createElement(this.menuType, { uri: this.uri, }),
        }, react.createElement("div", {
            className: "main-card-card",
            onClick: (event) => {
                History.push(this.href);
                event.preventDefault();
            },
        }, react.createElement("div", {
            className: "main-card-draggable",
            draggable: "true"
        }, react.createElement("div", {
            className: "main-card-imageContainer"
        }, react.createElement("div", {
            className: `main-cardImage-imageWrapper ${this.uriType === URI.Type.ARTIST ? "main-cardImage-circular": ""}`
        }, react.createElement("div", {
        }, react.createElement("img", {
            "aria-hidden": "false",
            draggable: "false",
            loading: "lazy",
            src: this.getCover(),
            className: `main-image-image main-cardImage-image ${
                this.uriType === URI.Type.ARTIST ?
                    "main-image-image main-cardImage-image main-cardImage-circular" : ""
            }`
        }),
           react.createElement("div", {},
               react.createElement(
                   "span",
                   {className: "badge badge-rank"},
                   `#${this.rank}`
               ),
               react.createElement(
                   "span",
                   {className: `badge badge-popularity ${this.setPopularityBadge()}`},
                   react.createElement(
                       "span",
                       { style: { marginBottom: "0 !important"}},
                       PopularityIcon, this.popularity
                       )
                   ),
               )), react.createElement("div", {
           className: "main-card-PlayButtonContainer"
        }, react.createElement("button", {
            className: "main-playButton-PlayButton main-playButton-primary",
            "aria-label": Spicetify.Locale.get("play"),
            style: { "--size": "40px" },
            onClick: this.play.bind(this),
        }, react.createElement("svg", {
            height: "16",
            role: "img",
            width: "16",
            viewBox: "0 0 24 24",
            "aria-hidden": "true"
        }, react.createElement("polygon", {
            points: "21.57 12 5.98 3 5.98 21 21.57 12",
            fill: "currentColor"
        }))))), react.createElement("div", {
                className: "main-card-cardMetadata"
            }, react.createElement("a", {
                draggable: "false",
                title: this.getTitle(),
                className: "main-cardHeader-link",
                dir: "auto",
                href: this.href
            }, react.createElement("div", {
                className: "main-cardHeader-text main-type-balladBold",
                as: "div"
            }, this.getTitle())), detail.length > 0 && react.createElement("div", {
                className: "main-cardSubHeader-root main-type-mestoBold reddit-cardSubHeader",
                as: "div",
            }, react.createElement("span", null, detail.join(" ‒ ")),
        ), this.getSubtitle(),
        )))));
    }
}
