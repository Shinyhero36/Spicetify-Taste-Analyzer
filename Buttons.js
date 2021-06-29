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
