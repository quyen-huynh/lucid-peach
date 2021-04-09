import React, { useState, useEffect, Fragment } from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import calm1 from './Assets/calm1.png';
import calm2 from './Assets/calm2.png';
import calm3 from './Assets/calm3.png';
import calm4 from './Assets/calm4.png';

const today = new Date();
  const hour = today.getHours();

export default function HomeScreen() {
  const { quote, updateQuote } = useQuote()

	return (
		<ScrollView style={styles.scrollView}>
      <Text style={styles.heading}>Home</Text>
      {greet()}
      {displayImage()}
			{quote && (
				<Fragment>
					<Text style={styles.quoteText}>{quote.text}</Text>
					<Text style={styles.quoteAuthor}>- {quote.author}</Text>
					<Button onPress={updateQuote} title="Show Me Another Quote!" />
				</Fragment>
			)}
		</ScrollView>
	)
}

function greet() {
  if (hour >= 5 && hour < 13) {
    return <Text style={styles.paragraph}>Good morning!</Text>
  } else if (hour >= 13 && hour < 18) {
    return <Text style={styles.paragraph}> Good afternoon!</Text>
  } else {
    return <Text style={styles.paragraph}>Good evening!</Text>
  }
}

function displayImage() {
  if (hour >= 5 && hour < 9) {
    return <Image source={calm1} style={styles.image} resizeMethod='contain'/>
  } else if (hour >= 9 && hour < 13) {
    return <Image source={calm2} style={styles.image} resizeMethod='contain'/>
  } else if (hour >= 13 && hour < 18) {
    return <Image source={calm3} style={styles.image}/>
  } else {
    return <Image source={calm4} style={styles.image}/>
  }
}

function useQuote() {
	const [quote, setQuote] = useState()

	useEffect(() => {
		updateQuote()
	}, [])

	const updateQuote = () => {
		fetch("https://type.fit/api/quotes")
			.then((response) => response.json())
			.then((quotes) => {
				const randomIndex = Math.floor(Math.random() * quotes.length)
				setQuote(quotes[randomIndex])
			})
	}

	return { quote, updateQuote }
}

const styles = StyleSheet.create({
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
  quoteText: {
    fontFamily: 'Baskerville',
		textAlign: "center",
		fontSize: 20,
	},
	quoteAuthor: {
    fontFamily: 'Baskerville',
    textAlign: "center",
		fontSize: 16,
		marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: 350,
    height: 200,
    alignSelf: 'center',
    marginBottom: 80,
  },
  paragraph: {
    fontSize: 20,
    fontFamily: 'Baskerville',
    textAlign: 'center',
    marginBottom: 20,
  },
});