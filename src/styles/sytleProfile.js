import {StyleSheet} from 'react-native';

const styleProfile = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dob: {
    fontSize: 16,
    color: '#555',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default styleProfile;
