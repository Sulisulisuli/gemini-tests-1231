import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { BtcPrice } from './BtcPrice';

export default declareComponent(BtcPrice, {
  name: 'BTC Price',
  description: 'A component to display the current price of Bitcoin.',
  group: 'Crypto',
  props: {
    heading: props.Text({
      name: 'Heading',
      defaultValue: 'Current Bitcoin Price',
    }),
  },
});
