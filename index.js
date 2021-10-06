// Run "npm i @types/react" to have this type package available in workspace
/// <reference types="react" />
// noinspection JSUnresolvedVariable

/** @type {React} */
const {
  URI,
  React: react,
  Platform: { History },
  showNotification,
} = Spicetify;

const APP_NAME = "My Music Tastes";
const FOOTER = {
  message: "Made by @Shinyhero36",
  url: "https://github.com/Shinyhero36/Spicetify-Taste-Analyzer",
};

/**
 * This function will be used to mount the app to the main view.
 * @returns {*}
 */
function render() {
  return react.createElement(App);
}

let gridList = [];

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

  async componentDidMount() {
    // Render components once
    if (gridList.length === 0) {
      await this.fetchInfo();

      gridList.push(
        react.createElement(Carousel, {
          title: "Your top 10 genres",
          items: userInfo.genres.slice(0, 10),
          component: CategoryCard,
        })
      );

      gridList.push(
        react.createElement(Carousel, {
          title: "Artists of the moment",
          description: "A list of your favourite artists of the moment",
          items: userInfo.artists.now,
          component: Card,
          showBtn: false,
        })
      );

      gridList.push(
        react.createElement(Carousel, {
          title: "Artists of all-time",
          description: "A list of your favourite artists of all-time",
          items: userInfo.artists.allTime,
          component: Card,
          showBtn: false,
        })
      );

      gridList.push(
        react.createElement(Carousel, {
          title: "Tracks of the moment",
          description: "A list of your favourite tracks of the moment",
          items: userInfo.tracks.now,
          component: Card,
          showBtn: false,
        })
      );

      gridList.push(
        react.createElement(Carousel, {
          title: "Tracks of all-time",
          description: "A list of your favourite tracks of all-time",
          items: userInfo.tracks.allTime,
          component: Card,
          showBtn: false,
        })
      );

      // Footer
      gridList.push(react.createElement(Footer, FOOTER));
    }

    this.reload();
  }

  render() {
    return react.createElement(
      "section",
      {
        className: "Bocw75wJnfKX_tXd4Zj0",
      },
      // Header
      react.createElement(Header, {
        title: APP_NAME,
      }),
      // Body
      react.createElement(
        "div",
        {
          className: "sbU_cIh6kQUanX3IUWD8",
        },
        react.createElement("div", {
          className: "main-actionBarBackground-background",
        }),
        react.createElement(
          "div",
          {
            className: "MyIjLCV_8t8KluouRgpd contentSpacing",
          },
          this.state.isLoading ? LoadingIcon : gridList
        )
      )
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
