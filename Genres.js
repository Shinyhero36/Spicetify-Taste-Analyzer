class Genre extends react.Component {
    constructor(props) {
        super(props);
        Object.assign(this, props);
    }

    render() {
        return (
            react.createElement("div", { className: "genre-container"},
                react.createElement("div", { className: "genre-card"},
                    react.createElement("h3", null, `${this.position} / ${this.name}`)
                )
            )
        )
    }

}


class TopGenre extends react.Component {
    constructor(props) {
        super(props);
        Object.assign(this, props);
    }

    render() {
        return (
            react.createElement("div", {style: {"display": "block"}},
                react.createElement("div", null,
                    react.createElement("div", { className: "header"},
                        react.createElement("h2", { className: "header-title"}, "Top Genres")
                    ),
                    react.createElement("div", { className: "genre-list"},
                        react.createElement("div", { style: { "margin-right": "1em" }},
                            this.genres.slice(0, 5).map(genre => react.createElement(Genre, genre))
                        ),
                        react.createElement("div", null,
                            this.genres.slice(-5).map(genre => react.createElement(Genre, genre))
                        ),
                    )
                )
            )
        )
    }

}
