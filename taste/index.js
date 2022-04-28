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
    case "/taste/artists-long":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Favourite artists of all-time",
          component: Card,
          items: userInfo.artists.allTime,
        })
      );
      break;

    case "/taste/artists-short":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Favourite artists for the past 4 weeks",
          component: Card,
          items: userInfo.artists.now,
        })
      );
      break;

    case "/taste/tracks-long":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Favourite tracks of all-time",
          component: Card,
          items: userInfo.tracks.allTime,
        })
      );
      break;

    case "/taste/tracks-short":
      return react.createElement(
        "section",
        {
          className: "contentSpacing",
        },
        react.createElement(Grid, {
          title: "Favouritetracks for the past 4 weeks",
          component: Card,
          items: userInfo.tracks.now,
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
          collections: [
            {
              id: "genres",
              items: userInfo.genres.slice(0, 10),
            },
          ],
          component: CategoryCard,
          showBtn: false,
          pathTo: "/taste/top-genres",
          style: {
            "--item-height": "80px",
            "--minimumColumnWidth": "220px",
          },
        })
      );

      sections.push(
        react.createElement(Shelf, {
          title: "Favourite Artists",
          description: "A list of your favourite artists",
          collections: [
            {
              id: "short",
              title: "Last 4 Weeks",
              items: userInfo.artists.now,
            },
            {
              id: "long",
              title: "All Time",
              items: userInfo.artists.allTime,
            },
          ],
          component: Card,
          showBtn: true,
          pathTo: "/taste/artists",
        })
      );

      sections.push(
        react.createElement(Shelf, {
          title: "Favourite Tracks",
          description: "A list of your favourite tracks",
          collections: [
            {
              id: "short",
              title: "Last 4 Weeks",
              items: userInfo.tracks.now,
            },
            {
              id: "long",
              title: "All Time",
              items: userInfo.tracks.allTime,
            },
          ],
          component: Card,
          showBtn: true,
          pathTo: "/taste/tracks",
        })
      );
    }

    const { entries } = History;
    if (entries.filter((entry) => entry.pathname === "/").length === 0) {
      History.push("/"); // Go back to home to load CSS
      History.push("/artist/59XQUEHhy5830QsAsmhe2M"); // TODO: Go to artist page to load CSS
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
