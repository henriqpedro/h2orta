import { ActivityIndicator } from 'react-native'

export default ({loading, color, children }) => {
  return loading ? <ActivityIndicator color={color || '#76A136'} size='large' /> : children;
}