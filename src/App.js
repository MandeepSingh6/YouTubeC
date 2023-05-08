import "./App.css";
import Body from "./components/Body";
import store from "./utils/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import WatchPage from "./components/WatchPage";
import SearchResults from "./components/SearchResults";
import ShortsWatchPage from "./components/ShortsWatchPage";
import ChannelPage from "./components/ChannelPage";

function App() {
  const appRouter = createBrowserRouter([
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
