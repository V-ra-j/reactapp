import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { MotiView } from 'moti';

const { width, height } = Dimensions.get('window');

// Generate multiple balls with random properties
const generateBalls = (count: number) =>
  Array.from({ length: count }).map((_, index) => ({
    key: index,
    size: Math.random() * 60 + 20, // Size between 20-80
    color: `hsl(${Math.random() * 360}, 100%, 60%)`, // Random vibrant color
    startX: Math.random() * width,
    startY: Math.random() * height,
  }));

const balls = generateBalls(20); // Generate 20 moving balls

export default function ClickableBallsScreen() {
  return (
    <View style={styles.container}>
      {balls.map(({ key, size, color, startX, startY }) => (
        <ClickableBall key={key} size={size} color={color} startX={startX} startY={startY} />
      ))}
    </View>
  );
}

// Individual ball component
const ClickableBall = ({ size, color, startX, startY }: { size: number; color: string; startX: number; startY: number }) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable onPress={() => setPressed(!pressed)}>
      <MotiView
        from={{ translateX: startX, translateY: startY, opacity: 0.9 }}
        animate={{
          translateX: [Math.random() * width, Math.random() * width],
          translateY: [Math.random() * height, Math.random() * height],
          opacity: [0.9, 1, 0.9], // Smooth fade in and out
        }}
        transition={{
          type: 'timing',
          duration: 5000 + Math.random() * 3000, // Random speed
          loop: true,
          repeatReverse: true,
        }}
        style={[
          styles.ball,
          {
            width: pressed ? size * 1.3 : size, // Expand when clicked
            height: pressed ? size * 1.3 : size,
            backgroundColor: pressed ? 'white' : color, // Change color on press
            borderRadius: size / 2,
          },
        ]}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for contrast
    alignItems: 'center',
    justifyContent: 'center',
  },
  ball: {
    position: 'absolute',
  },
});
