import React from 'react';
import { View, Text, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Cast } from '../interface/creditsInterface';
import { MovieFull } from '../interface/movieInterface';
import currencyFormatter from "currency-formatter";
import { CastItem } from './CastItem';

interface Props {
  movieFull: MovieFull,
  cast: Cast[]
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  console.log(movieFull && JSON.stringify(movieFull, null, 3));

  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 20}}>
        <Icon name="star-outline" size={16} color="gray" />
        <Text> {movieFull && movieFull.vote_average}</Text>


        <Text style={{ marginLeft: 5 }}>
          - {movieFull && movieFull.genres.map(g => g.name).join(', ')}
        </Text>
      </View>

      {/* Historia */}
      <View style={{marginHorizontal: 20}}>
        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold'}}>
          HISTORIA
        </Text>
        <Text>{movieFull && movieFull.overview}</Text>

        <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
          PRESUPUESTO
        </Text>
        <Text style={{ fontSize: 16 }} >{movieFull && currencyFormatter.format(movieFull.budget, { code: 'USD' })}</Text>
      </View>

      {/* Casting */}
      {cast &&
        <View style={{marginTop: 10, marginBottom: 100}}>
          <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20}}>Actores</Text>
          <FlatList data={cast} keyExtractor={(item) => item.id.toString()}
            style={{marginTop: 10, height: 70}}
            renderItem={({item}) => <CastItem actor={item} />}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }


    </View>
  )
}
