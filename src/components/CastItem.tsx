import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Cast } from '../interface/creditsInterface'

interface Props {
  actor: Cast
}

export const CastItem = ({ actor }: Props) => {
  const uri = `https://image.tmdb.org/t/p/w500${actor && actor.profile_path}`;

  return (
    <View style={styles.container}>
      {actor && actor.profile_path &&
        <Image source={{ uri }}
          style={{ width: 50, height: 50, borderRadius: 10, marginHorizontal: 5 }}
        />
      }
      <View style={styles.actorInfo}>
        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{actor && actor.name}</Text>
        <Text style={{ fontWeight: '300', fontSize: 16 }}>{actor && actor.character}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingRight: 15,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.24,
    shadowRadius: 10,
    elevation: 6,
    marginRight: 20,
    marginHorizontal: 20,
  },
  actorInfo: {
    marginLeft: 20,
    marginTop: 5
  }
});