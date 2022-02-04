import React from 'react';
import { View, Text, FlatList} from 'react-native';
import { Movies } from '../interface/movieInterface';
import { MoviePoster } from './MoviePoster';

interface optionsPoster {
  width?: number,
  height?: number
}

interface Props {
  movie: Movies[];
  title?: string;
  optionsPoster?: optionsPoster;
}

export const HorizontalSlider = ({movie, title, optionsPoster={width: 140, height: 200}}:Props) => {
  return (
    <View style={{ height: title ? 290 : 260 }}>
      {title && <Text style={{ fontSize: 30, textAlign: 'center', marginVertical: 10 }} >{title.toUpperCase()}</Text>}
      <FlatList
        data={movie}
        renderItem={({ item }: any) => <MoviePoster movie={item} width={optionsPoster.width} height={optionsPoster.height} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
