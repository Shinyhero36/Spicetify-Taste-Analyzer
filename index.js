// noinspection JSUnresolvedVariable, JSUnresolvedFunction

// Run "npm i @types/react" to have this type package available in workspace
/// <reference types="react" />

// noinspection JSUnresolvedVariable
/** @type {React} */
const { URI, React: react, Platform: { History } } = Spicetify;

// Define a function called "render" to spicetify app entry point
// This function will be used to mount app to main view.
function render() {
    return react.createElement(Grid)
}

let gridList = [];

const APP_NAME = "Taste Analyzer"

class Grid extends react.Component{
    constructor(props) {
        super(props);
        Object.assign(this, props);
        this.state = {
            isLoading: true,
        };
    }

    computeGenre(artists) {
        this.setState({
            isLoading: true
        })

        gridList = [];

        let allGenres = [];
        artists.forEach(artist => allGenres = allGenres.concat(artist.genres));

        let counts = {}
        allGenres.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        console.log(counts)

        let myGenres = []
        for (const [key, value] of Object.entries(counts)) {
            myGenres.push({
                name: key, counts: value
            })
        }

        function sort_by_key(array, key) {
            return array.sort(function(a, b) {
                let x = a[key];
                let y = b[key];
                return ((x < y) ? 1 : ((x > y) ? -1 : 0));
            });
        }

        let genres =  sort_by_key(myGenres, "counts").slice(0, 10);
        for (let i=0; i<genres.length; i++) {
            genres[i].position = i + 1
        }
        gridList.push(react.createElement(TopGenre, { genres: genres.slice(0, 10) }));
    }

    async fetchUserInfo() {
        let maxTopLength = 15;
        let resp = await fetchTopArtists("short_term");
        const artistsShort = await resp.items;

        resp = await fetchTopArtists("long_term");
        const artistsLong = await resp.items;

        resp = await fetchTopTracks("short_term");
        const tracksShort = await resp.items

        resp = await fetchTopTracks("long_term");
        const tracksLong = await resp.items;
        console.log(tracksLong)


        // Compute genres
        this.computeGenre(artistsLong)

        gridList.push(react.createElement(
            TopTracksArtists, { title: "Current favorite artists", tracks: artistsShort.slice(0, maxTopLength) }
        ))

        gridList.push(react.createElement(
            TopTracksArtists, { title: "All-Time favorite artists", tracks: artistsLong.slice(0, maxTopLength) }
        ))

        gridList.push(react.createElement(
            TopTracksArtists, { title: "Current favorite tracks", tracks: tracksShort.slice(0, maxTopLength) }
        ))

        gridList.push(react.createElement(
            TopTracksArtists, { title: "All-Time favorite tracks", tracks: tracksLong.slice(0, maxTopLength) }
        ))
    }

    reload() {
        // Change state
        this.setState({ isLoading: false  })
    }

    async componentDidMount() {
        await this.fetchUserInfo()
        this.reload();
    }

    componentWillUnmount() {}

    render() {
        return (
            react.createElement("section", { className: "contentSpacing" },
                react.createElement("div", { className: "taste-breaker-header" },
                    react.createElement("h1", null, APP_NAME),
                ),
                this.state.isLoading ? LoadingIcon: gridList)
        )
    }

}

const fetchTopArtists = async (timeRange) => {
    return await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}&limit=50`);
}

const fetchTopTracks = async (timeRange) => {
    return Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=50`)
}
