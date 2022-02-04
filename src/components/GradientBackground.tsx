import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { GradiantContext } from '../context/GradiantContext';
import { useFade } from '../hooks/useFade';

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const GradientBackground = ({ children }: Props) => {
  const { colors, prevColors, setPrevMainColor } = useContext(GradiantContext);
  const {opacity, fadeIn, fadeOut} = useFade();

  useEffect(() => {
    fadeIn(() => {
      setPrevMainColor(colors);
      fadeOut();
    });
  }, [colors]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[prevColors.primary, prevColors.secondary, "white"]}
        style={{ ...StyleSheet.absoluteFillObject }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.5, y: 0.8 }}
      />

      <Animated.View
        style={{ ...StyleSheet.absoluteFillObject, opacity }}
      >
        <LinearGradient
          colors={[colors.primary, colors.secondary, "white"]}
          style={{ ...StyleSheet.absoluteFillObject }}
          start={{ x: 0.1, y: 0.1 }}
          end={{ x: 0.5, y: 0.8 }}
        />
      </Animated.View>
      {children}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});