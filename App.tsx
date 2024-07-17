import 'react-native-gesture-handler';

import RootStack from './navigation';

const TextEncodingPolyfill = require('text-encoding');

Object.assign('global', {
  TextEncoder: TextEncodingPolyfill.TextEncoder,
  TextDecoder: TextEncodingPolyfill.TextDecoder,
});

export default function App() {
  return <RootStack />;
}
