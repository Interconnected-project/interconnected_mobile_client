import React from 'react';

import MyStatusBar from './src/common/MyStatusBar';
import MyText from './src/common/MyText';
import MyTitle from './src/common/MyTitle';
import MyView from './src/common/MyView';

export default function App() {
  return (
    <MyView>
      <MyStatusBar />
      <MyTitle>Title</MyTitle>
      <MyText>Text</MyText>
    </MyView>
  );
}
