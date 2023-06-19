import "./App.css";
import Body from "./components/Body";
import store from "../src/store/store";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import MainContainer from "../src/components/HomePage/MainContainer";
import WatchPage from "../src/components/WatchPage/WatchPage";
import SearchResults from "./components/SearchPage/SearchResults";
import ShortsWatchPage from "./components/Shorts/ShortsWatchPage";
import ChannelPage from "./components/Channel/ChannelPage";

function App() {
  const appRouter = createHashRouter([
    {
      path: "/",
      element: <Body />,
      children: [
        { path: "", element: <MainContainer /> },
        { path: "search", element: <SearchResults /> },
        { path: "shorts", element: <ShortsWatchPage /> },
        { path: "watch", element: <WatchPage /> },
        { path: "channel", element: <ChannelPage /> },
      ],
    },
  ]);

  return (
    <Provider store={store} className="app">
      <div className="App ">
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
