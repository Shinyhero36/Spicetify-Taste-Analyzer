const ShowMore = ({ text, active = true, onClick }) => {
    return react.createElement("button", {
        className: "show-more-btn",
        style: {
            "margin-top": "2em",
            "border-radius": "25px",
            "padding": "1em 2em",
            "font-weight": "bold",
            "background": "va(--spice-main)"
        },
        onClick,
    }, text);
};

class TopTracksArtists extends react.Component {
    constructor(props) {
        super(props);
        Object.assign(this, props)
        this.state = {
            maxSize: props.tracks.length,
            displayed: 5
        }
    }

    showMore() {
        this.setState({
            displayed: (this.state.displayed + 5 > this.state.maxSize ? this.state.maxSize : this.state.displayed + 5)
        });
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
                        react.createElement(ShowMore, {text: "Show More", onClick: this.showMore.bind(this)})
                    )
                ),

            )
        )
    }
}
