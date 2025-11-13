import { declareComponent } from '@webflow/react';
import { props } from '@webflow/data-types';
import { CmsSlider } from './CmsSlider';

export default declareComponent(CmsSlider, {
  name: 'CMS Slider',
  description: 'A dynamic, auto-scrolling slider for CMS items.',
  group: 'Sliders',
  props: {
    children: props.Slot({
      name: 'Slides',
    }),
    speed: props.Number({
      name: 'Autoplay Speed (ms)',
      defaultValue: 5000,
      helpText: 'The time in milliseconds between each auto-scroll.',
    }),
  },
});
