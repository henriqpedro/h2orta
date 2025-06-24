import { ActivityIndicator } from 'react-native'

export default ({loading, color, children }) => {
  return loading ? <ActivityIndicator color={color} size='large' /> : children;
}