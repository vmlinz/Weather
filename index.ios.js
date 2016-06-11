import React from 'react';
import {
  AppRegistry,
  MapView,
  StyleSheet,
} from 'react-native';
import fetchWeather from './src/api';

const styles = StyleSheet.create({
  map: {
    flex: 1,
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
    return (<MapView
      style={styles.map}
      annatations={[this.state.pin]}
      onRegionChangeComplete={this.onRegionChangeComplete}
    />);
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
