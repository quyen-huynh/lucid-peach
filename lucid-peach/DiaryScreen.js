import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import Slider from '@react-native-community/slider';

export default function DiaryScreen() {
  return (
    <ScrollView style={styles.scrollView}>
      <Text style={styles.heading}>My Diary</Text>

      <Text style={styles.prompt}>Today</Text>
      <TextInput
        style={styles.diaryInput}
        placeholder="Your thoughts, feelings, etc."
        multiline="true"
      />
      <Text style={styles.prompt}></Text>

      <Text style={styles.prompt}>Rate your happiness</Text>
      <PinkSlider name="happiness" />
      <Text>{'\n'}</Text>

      <Text style={styles.prompt}>Rate your productivity</Text>
      <PinkSlider name="productivity" />
      <Text>{'\n'}</Text>
    </ScrollView>
  );
}

class PinkSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      min: 0,
      max: 10,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Slider
          style={{ width: 200, height: 40, alignSelf: 'center' }}
          step={1}
          minimumValue={this.state.min}
          maximumValue={this.state.max}
          value={this.state.value}
          onValueChange={(val) => this.setState({ value: val })}
          thumbTintColor="rgb(252, 228, 149)"
          thumbTintColor={'pink'}
          minimumTrackTintColor={'pink'}
        />
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'Baskerville',
            }}>
            {Math.floor(this.state.value)}
          </Text>
        </View>

        {(() => {
          if (this.props.name == 'happiness') {
            if (this.state.value > 5) {
              return (
                <Text style={styles.paragraph}>
                  {'\n'}Yay! It is always good to feel happy. Here are some tips
                  to keep being joyful and positive, especially during this
                  time!
                </Text>
              );
            } else if (0 < this.state.value && this.state.value <= 5) {
              return (
                <Text style={styles.paragraph}>
                  {'\n'}Oh no! Looks like it hasn't been a good day for you.
                  Don't worry, the sky is always clear after a thunderstorm.
                  Check out some tips to cheer yourself up!
                </Text>
              );
            }
          } else if (this.props.name == 'productivity') {
            if (this.state.value > 5) {
              return (
                <Text style={styles.paragraph}>
                  {'\n'}Fabulous! You've managed to stay productive even in this
                  difficult time. Want to know some tricks to maintain your
                  productivity? Check them out below!
                </Text>
              );
            } else if (0 < this.state.value && this.state.value <= 5) {
              return (
                <Text style={styles.paragraph}>
                  {'\n'}You're not alone! Staying productive is not easy
                  especially during this difficult time. Here is some advice to
                  boost your productivity!
                </Text>
              );
            }
          }
        })()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'white',
    padding: 20,
  },
  heading: {
    margin: 24,
    backgroundColor: 'pink',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'McLauren',
  },
  prompt: {
    fontSize: 18,
    fontFamily: 'Baskerville-Italic',
  },
  paragraph: {
    fontSize: 18,
    fontFamily: 'Baskerville',
  },
  diaryInput: {
    height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 8,
    fontSize: 16,
    fontFamily: 'Baskerville',
  },
});