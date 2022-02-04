import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator, Dimensions, ScrollView} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MoviePoster } from '../components/MoviePoster';
import { useMovies } from '../hooks/useMovies';
import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColors';
import { GradiantContext } from '../context/GradiantContext';


const { width: windowWidth } = Dimensions.get('window');
export const HomeScreen = () => {
  const { nowPlaying, isLoading, popular, topRated, upcoming } = useMovies();
  const insets = useSafeAreaInsets();
  const {setMainColor, setPrevMainColor} = useContext(GradiantContext);

  const getPosterColors = async (index: number) => {
    let movie = nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const [ primary = "green", secondary = "orange" ] = await getImageColors(uri);
    setMainColor({primary, secondary});
  }

  useEffect(() => {
    if(nowPlaying.length > 0){ getPosterColors(0); }
  }, [nowPlaying]);

  if (isLoading) {
    return (<View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      {isLoading && <ActivityIndicator color='red' size={30} />}
    </View>
    )
  } else {
    return (
      <GradientBackground>
        <ScrollView>
          <View style={{ marginTop: insets.top + 20 }}>
            <View style={{ height: 440 }} >
              <Carousel
                data={nowPlaying!}
                renderItem={({ item }: any) => <MoviePoster movie={item} />}
                sliderWidth={windowWidth}
                itemWidth={300}
                inactiveSlideOpacity={0.9}
                onSnapToItem={getPosterColors}
              />
            </View>

            <HorizontalSlider movie={popular} title="Popular" />
            <HorizontalSlider movie={topRated} title="Top Rated" />
            <HorizontalSlider movie={upcoming} title="Up Coming" />
          </View>
        </ScrollView>
      </GradientBackground>
    )
  }
}
