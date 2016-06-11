import React from 'react';
import {
  View,
  Text,
  AppRegistry,
  MapView,
  StyleSheet,
} from 'react-native';
import capitalize from 'lodash-es/capitalize';
import fetchWeather from './src/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 2,
    marginTop: 20,
  },
  texts: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 30,
  },
});

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin: props.pin,
      city: props.city,
      temperature: props.temperature,
      description: props.description,
    };
    this.onRegionChangeComplete = this.onRegionChangeComplete.bind(this);
  }
  onRegionChangeComplete(region) {
    console.log(region);
    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude,
      },
    });

    fetchWeather(region.latitude, region.longitude)
    .then((data) => {
      console.log(data);
      this.setState({
        city: data.city,
        temperature: data.temperature,
        description: data.description,
      });
    });
  }
  render() {
    return (<View style={styles.container} >
      <MapView
        style={styles.map}
        annatations={[this.state.pin]}
        onRegionChangeComplete={this.onRegionChangeComplete}
      />
      <View style={styles.texts} >
        <Text style={styles.text} >{this.state.city}</Text>
        <Text style={styles.text} >{this.state.temperature}</Text>
        <Text style={styles.text} >
          {capitalize(this.state.description)}
        </Text>
      </View>
    </View>);
  }
}

Weather.propTypes = {
  onRegionChangeComplete: React.PropTypes.func,
  annatations: React.PropTypes.array,
  pin: React.PropTypes.object,
  city: React.PropTypes.string.isRequired,
  temperature: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
};

Weather.defaultProps = {
  pin: {
    latitude: 37,
    longitude: -95,
  },
  annatations: [],
  onRegionChangeComplete: null,
  city: '',
  temperature: '',
  description: '',
};

AppRegistry.registerComponent('Weather', () => Weather);
