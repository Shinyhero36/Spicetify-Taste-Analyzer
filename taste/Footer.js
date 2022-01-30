const Footer = (footer) => {
  return react.createElement(
    "div",
    {
      className: "x-album-footer",
    },
    react.createElement(
      "div",
      {
        className: "wggmHVWzlw5OzJkFusA5",
      },
      react.createElement(
        "p",
        {
          className: "main-type-finale",
          dir: "auto",
        },
        react.createElement(
          "a",
          {
            href: footer.url,
            style: {
              color: "inherit",
            },
          },
          footer.message
        )
      )
    )
  );
};
