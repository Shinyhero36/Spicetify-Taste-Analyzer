// Run "npm i @types/react" to have this type package available in workspace
/// <reference types="react" />
// noinspection JSUnresolvedVariable

/** @type {React} */
const {
  URI,
  React: react,
  Platform: { History },
} = Spicetify;

const FooterProps = {
  message: "Made by @Shinyhero36",
  url: "https://github.com/Shinyhero36/Spicetify-Taste-Analyzer",
};

/**
 * This function will be used to mount the app to the main view.
 * @returns {*}
 */
function render() {
  const { location } = History;

  switch (location.pathname) {
    case "/taste/alltime-artists":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Artists of all-time",
          component: Card,
          items: userInfo.artists.allTime,
        })
      );
      break;

    case "/taste/alltime-tracks":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Tracks of all-time",
          component: Card,
          items: userInfo.tracks.allTime,
        })
      );
      break;

    case "/taste/moment-artists":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Artists of the moment",
          component: Card,
          items: userInfo.artists.now,
        })
      );
      break;

    case "/taste/moment-tracks":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Tracks of the moment",
          component: Card,
          items: userInfo.tracks.now,
        })
      );
      break;

    case "/taste/top-genres":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Tracks of the moment",
          component: CategoryCard,
          items: userInfo.genres.slice(0, 10),
          style: {
            "--item-height": "80px",
            "--minimumColumnWidth": "180px",
          },
        })
      );
      break;

    case "/taste":
      return react.createElement(App, { title: "My music tastes" });
      break;

    default:
      console.log(location.pathname);
  }
}

let sections = [];

let userInfo = {
  artists: {
    now: [],
    allTime: [],
  },
  tracks: {
    now: [],
    allTime: [],
  },
  genres: [],
};

class App extends react.Component {
  constructor(props) {
    super(props);
    Object.assign(this, props);
    this.state = {
      isLoading: true,
    };
  }

  reload() {
    // Change state
    this.setState({ isLoading: false });
  }

  /**
   * Returns an array of objects containing genre name and occurrences
   * @param artists
   * @returns {*}
   */
  computeGenres(artists) {
    let allGenres = [];
    artists.forEach((artist) => (allGenres = allGenres.concat(artist.genres)));

    let counts = {};
    allGenres.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    let myGenres = [];
    for (const [key, value] of Object.entries(counts)) {
      myGenres.push({
        name: key,
        counts: value,
      });
    }

    const sort_by_key = (array, key) => {
      return array.sort(function (a, b) {
        let x = a[key];
        let y = b[key];
        return x < y ? 1 : x > y ? -1 : 0;
      });
    };

    return sort_by_key(myGenres, "counts");
  }

  /**
   * Do some API calls
   *
   * @returns {Promise<void>}
   */
  async fetchInfo() {
    userInfo.artists.allTime = await fetchTopArtists("long");
    userInfo.artists.now = await fetchTopArtists("short");

    userInfo.tracks.allTime = await fetchTopTracks("long");
    userInfo.tracks.now = await fetchTopTracks("short");

    userInfo.genres = this.computeGenres(userInfo.artists.allTime);
  }

  /**
   * Render components when all the fetching is done
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    // Render components once
    if (sections.length === 0) {
      await this.fetchInfo();

      sections.push(
        react.createElement(Shelf, {
          title: "Your top genres",
          items: userInfo.genres.slice(0, 10),
          component: CategoryCard,
          showBtn: true,
          pathTo: "/taste/top-genres",
          style: {
            "--item-height": "80px",
            "--minimumColumnWidth": "220px",
          },
        })
      );

      sections.push(
        react.createElement(Shelf, {
          title: "Artists of the moment",
          description: "A list of your favourite artists of the moment",
          items: userInfo.artists.now,
          component: Card,
          showBtn: true,
          pathTo: "/taste/moment-artists",
        })
      );

      sections.push(
        react.createElement(Shelf, {
          title: "Artists of all-time",
          description: "A list of your favourite artists of all-time",
          items: userInfo.artists.allTime,
          component: Card,
          showBtn: true,
          pathTo: "/taste/alltime-artists",
        })
      );

      sections.push(
        react.createElement(Shelf, {
          title: "Tracks of the moment",
          description: "A list of your favourite tracks of the moment",
          items: userInfo.tracks.now,
          component: Card,
          showBtn: true,
          pathTo: "/taste/moment-tracks",
        })
      );

      sections.push(
        react.createElement(Shelf, {
          title: "Tracks of all-time",
          description: "A list of your favourite tracks of all-time",
          items: userInfo.tracks.allTime,
          component: Card,
          showBtn: true,
          pathTo: "/taste/alltime-tracks",
        })
      );
    }

    const { entries } = History;

    if (entries.filter((entry) => entry.pathname === "/").length === 0) {
      History.push("/"); // Go back to home to load CSS
      History.push("/taste"); // Go to the custom app page
    } else {
      this.reload();
    }
  }

  render() {
    return react.createElement(
      "section",
      {
        className: "contentSpacing",
      },
      // Header
      react.createElement(
        "div",
        {
          className: "reddit-header",
        },
        react.createElement("h1", null, this.props.title)
      ),
      // Content
      this.state.isLoading ? LoadingIcon : sections,

      react.createElement(Footer, FooterProps)
    );
  }
}

/**
 * Fetch top artists for a specific range: (short | medium | long)
 * @param timeRange
 * @returns {Promise<Response.body>}
 */
const fetchTopArtists = async (timeRange) => {
  const r = await Spicetify.CosmosAsync.get(
    `https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}_term&limit=50`
  );
  return await r.items;
};

/**
 * Fetch top tracks for a specific range: (short | medium | long)
 * @param timeRange
 * @returns {Promise<Response.body>}
 */
const fetchTopTracks = async (timeRange) => {
  const r = await Spicetify.CosmosAsync.get(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}_term&limit=50`
  );
  return await r.items;
};
