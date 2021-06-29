class TopTracksArtists extends react.Component {
    constructor(props) {
        super(props);
        Object.assign(this, props)
        this.state = {
            maxSize: props.tracks.length,
            displayed: 5,
            btnText: "Show More"
        }
    }

    showMore() {
        // If everything is already shown
        if (this.state.maxSize === this.state.displayed) {
            this.setState({ displayed: 5, btnText: "Show More" })
        } else if (this.state.displayed + 5 >= this.state.maxSize) {
            this.setState({ displayed: this.state.maxSize, btnText: "Show less" })
        } else {
            this.setState({ displayed: this.state.displayed + 5})
        }
    }

    componentDidMount() {  }


    render() {
        return (
            react.createElement("div", {style: {"display": "block"}},
                react.createElement("div", {className: "artist show"},
                    react.createElement("div", { className: "header"},
                        react.createElement("h2", { className: "header-title"}, this.title)
                    ),

                    react.createElement(
                        "div",
                        {className: "main-gridContainer-gridContainer", style: {"--minimumColumnWidth": "180px"}},
                        this.tracks.slice(0, this.state.displayed).map(card => react.createElement(Card, card))
                    ),
                    react.createElement(
                        "div",
                        { style: { "place-content": "center", "display": "flex" }},
                        react.createElement(ShowMore, {text: this.state.btnText, onClick: this.showMore.bind(this)})
                    )
                ),

            )
        )
    }
}
