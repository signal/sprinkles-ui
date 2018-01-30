import React from 'react';
import ReactDOM from 'react-dom';
import './shared/removePolyfill';
import {
  Alert,
  BulletedList,
  Button,
  Checkbox,
  Dropdown,
  Field,
  Form,
  List,
  ListItem,
  Menu,
  Panel,
  Popover,
  SearchInput,
  Text,
  TextInput,
  TextListItem,
  Theme,
  VectorGraphic,
  // colors
  ButtonColors,
  BackgroundColors,
  FormColors,
  IconColors,
  NoticeColors,
  StructuralColors,
  TextColors,
  // styles
  Resets,
} from './Sprinkles';


// export Sprinkles, React and ReactDOM globally
window.Sprinkles = {
  Alert,
  BulletedList,
  Button,
  Checkbox,
  Dropdown,
  Field,
  Form,
  List,
  ListItem,
  Menu,
  Panel,
  Popover,
  SearchInput,
  Text,
  TextInput,
  TextListItem,
  Theme,
  VectorGraphic,
  // colors
  ButtonColors,
  BackgroundColors,
  FormColors,
  IconColors,
  NoticeColors,
  StructuralColors,
  TextColors,
  // Styles
  Resets,
};
window.React = React;
window.ReactDOM = ReactDOM;
