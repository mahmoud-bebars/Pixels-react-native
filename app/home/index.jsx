import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useRef, useState, useEffect, useCallback } from "react";
import SearchBar from "../../components/SearchBar";
import Header from "../../components/Header";
import Categories from "../../components/Categories";
import { theme } from "../../constants/theme";
import { hp } from "../../heplers/common";
import { apiFetch } from "../../api";
import Error from "../../components/Error";
import Empty from "../../components/Empty";
import ImageGrid from "../../components/ImageGrid";

import { debounce } from "lodash";
import FiltersModal from "../../components/FiltersModal";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Skelaton from "../../components/Skelaton";
import FiltersPreview from "../../components/FiltersPreview";
import { useRouter } from "expo-router";

let page = 1;

const HomeScreen = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const [filters, setFilters] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [isEnd, setIsEnd] = useState(false);

  const [search, setSearch] = useState("");

  const [activeCategory, setActiveCategory] = useState(null);

  const searchInputRef = useRef(null);

  const bottomSheetModalRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async (params = { page: 1 }, append = true) => {
    if (data.length === 0) {
      setLoading(true);
    }
    let res = await apiFetch(params);
    if (res.sucess) {
      if (append) {
        setData([...data, ...res.results]);
      } else {
        setData([...res.results]);
      }
      setLoading(false);
    } else {
      setError(res.results);
      setLoading(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }, 1000);
  }, []);

  const handleSearch = (text) => {
    setSearch(text);

    if (text.length > 2) {
      // search for this text
      page = 1;
      setActiveCategory(null);
      setData([]);
      fetchImages({ page, q: text, ...filters }, false);
    }
    if (text == "") {
      // rseset the results
      page = 1;
      setData([]);
      setActiveCategory(null);
      fetchImages({ page, ...filters }, false);
    }
  };

  const clearSearch = () => {
    searchInputRef?.current.clear();
    handleSearch("");
  };

  const handleChangeCategory = (cat) => {
    clearSearch();
    if (activeCategory === cat) {
      // rseset the results
      setActiveCategory(null);
      page = 1;
      setData([]);
      fetchImages({ page, ...filters });
    } else {
      page = 1;
      setActiveCategory(cat);
      fetchImages({ page, category: cat, ...filters }, false);
    }
  };

  const closeFilterModel = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const applyFilters = () => {
    if (filters) {
      page = 1;
      setData([]);
      let params = {
        page,
        ...filters,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }

    closeFilterModel();
  };

  const resetFilters = () => {
    if (filters) {
      page = 1;
      setFilters(null);
      setData([]);
      let params = {
        page,
      };
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }

    closeFilterModel();
  };

  const clearFilterByKey = (key) => {
    let new_filters = { ...filters };

    delete new_filters[key];
    setFilters(new_filters);

    page = 1;
    setData([]);
    let params = {
      page,
      ...new_filters,
    };

    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params, false);
  };

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({ y: 0, animated: true });
  };

  const handleScroll = (event) => {
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollViewOffset = event.nativeEvent.contentOffset.y;
    const bottomPostion = contentHeight - scrollViewHeight;

    if (scrollViewOffset >= bottomPostion - 1) {
      if (!isEnd) {
        setIsEnd(true);
        console.log("user reached end of screen");
        // fetch more data
        ++page;
        let params = {
          page,
          ...filters,
        };
        if (activeCategory) params.category = activeCategory;
        if (search) params.q = search;
        fetchImages(params, true);
      }
    } else if (isEnd) {
      setIsEnd(false);
      console.log("user is Out of Screen End");
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  const paddingTop = top > 0 ? top + 10 : 30;

  return (
    <GestureHandlerRootView>
      <StatusBar onPress={handleScrollUp} barStyle="dark-content" />
      <BottomSheetModalProvider>
        <View style={[styles.container, { paddingTop }]}>
          <Header
            handleScrollUp={handleScrollUp}
            bottomSheetModalRef={bottomSheetModalRef}
          />

          <ScrollView
            onScroll={handleScroll}
            scrollEventThrottle={5} // how often scroll event will fire while scrolling (in ms)
            ref={scrollRef}
            contentContainerStyle={{ gap: 15 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <SearchBar
              search={search}
              handleTextDebounce={handleTextDebounce}
              clearSearch={clearSearch}
              searchRef={searchInputRef}
            />
            <Categories
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
            <FiltersPreview
              filters={filters}
              clearFilterByKey={clearFilterByKey}
            />
            <Text style={styles.categoryTitle}>
              {activeCategory !== null
                ? activeCategory
                : search !== ""
                ? `Results for ${search}`
                : "Most Popular"}
            </Text>
            {loading && <Skelaton />}
            {error && <Error />}
            {data.length === 0 ? (
              <Empty />
            ) : (
              <ImageGrid router={router} images={data} />
            )}
            {/* Loading Activity Indicatior */}
            {!error && data.length > 0 && (
              <View
                style={{
                  marginBottom: 70,
                  marginTop: data.length > 0 ? 10 : 70,
                }}
              >
                <ActivityIndicator size="large" />
              </View>
            )}
          </ScrollView>

          <FiltersModal
            bottomSheetModalRef={bottomSheetModalRef}
            onClose={closeFilterModel}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            filters={filters}
            setFilters={setFilters}
          />
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, gap: 15, height: "100%", width: "100%" },
  categoryTitle: {
    textTransform: "capitalize",
    alignSelf: "center",
    color: theme.colors.neutral(0.9),
    fontSize: hp(3),
    fontWeight: theme.fontWeights.meduim,
    letterSpacing: 1,
  },
});
