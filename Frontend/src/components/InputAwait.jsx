import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { TextField } from '@material-ui/core';

// -- tiré de react-delay-input --

export default class DelayInput extends React.PureComponent {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    minLength: PropTypes.number,
    delayMax: PropTypes.number,
    delayTimeout: PropTypes.number,
    forceNotifyByEnter: PropTypes.bool,
    forceNotifyOnBlur: PropTypes.bool,
    inputRef: PropTypes.func,
    leadingNotify: PropTypes.bool,
    trailingNotify: PropTypes.bool,
  };

  static defaultProps = {
    onKeyDown: undefined,
    onBlur: undefined,
    value: undefined,
    minLength: 0,
    delayMax: undefined,
    delayTimeout: 100,
    forceNotifyByEnter: true,
    forceNotifyOnBlur: true,
    inputRef: undefined,
    leadingNotify: false,
    trailingNotify: true,
  };

  constructor(props) {
    super(props);

    this.state = {
        number: props.number,
        label: props.label,
        value: props.value || ''
    };

    this.isDebouncing = false;
  }

  componentDidMount() {
    this.createNotifier(this.props);
  }

  componentDidUpdate(prevProps, _prevState, _snapshot) {
    if (this.isDebouncing) {
      return;
    }
    const {
      delayMax: delayMaxNext,
      delayTimeout: delayTimeoutNext,
      leadingNotify: leadingNotifyNext,
      trailingNotify: trailingNotifyNext,
      value: valueNext,
    } = this.props;
    const {
      delayMax,
      delayTimeout,
      leadingNotify,
      trailingNotify,
      value,
    } = prevProps;
    
    if (typeof valueNext !== 'undefined' && value !== valueNext) {
      this.setState({
        value: valueNext
      });
    }
    
    if (
      delayMax !== delayMaxNext ||
      delayTimeout !== delayTimeoutNext ||
      leadingNotify !== leadingNotifyNext ||
      trailingNotify !== trailingNotifyNext
    ) {
      this.createNotifier(this.props);
    }
  }

  componentWillUnmount() {
    if (this.flush) {
      this.flush();
    }
  }

  onChange = event => {

    event.persist();

    const oldValue = this.state.value;

    this.setState({value: event.target.value}, () => {
      const {value} = this.state;

      if (value.length >= this.props.minLength) {
        this.notify(event);
        return;
      }

      // If user hits backspace and goes below minLength consider it cleaning the value
      if (oldValue.length > value.length) {
        this.notify({...event, target: {...event.target, value: ''}});
      }
    });
  };

  onKeyDown = event => {
    const {onKeyDown} = this.props;

    if (event.key === 'Enter') {
      this.forceNotify(event);
    }
    // Invoke original onKeyDown if present
    if (onKeyDown) {
      onKeyDown(event);
    }
  };

  onBlur = event => {
    const {onBlur} = this.props;

    this.forceNotify(event);
    // Invoke original onBlur if present
    if (onBlur) {
      onBlur(event);
    }
  };

  createNotifier(props) {
    const {
      delayMax: maxWait,
      delayTimeout,
      leadingNotify: leading,
      trailingNotify: trailing,
    } = props;
    if (delayTimeout < 0) {
      this.notify = () => null;
    } else if (delayTimeout === 0) {
      this.notify = this.doNotify;
    } else {
      const debounceOpts = {
        leading,
        trailing,
      };
      // DO NOT set the maxWait option if undefined; it causes debounce to 
      // maxWait with the default delayTimeout value.
      if (maxWait !== undefined && maxWait !== null) {
        debounceOpts.maxWait = maxWait;
      }
      const debouncedChangeFunc = debounce(event => {
        this.isDebouncing = false;
        this.doNotify(event);
      }, delayTimeout, debounceOpts);

      this.notify = event => {
        this.isDebouncing = true;
        debouncedChangeFunc(event);
      };

      this.flush = () => debouncedChangeFunc.flush();

      this.cancel = () => {
        this.isDebouncing = false;
        debouncedChangeFunc.cancel();
      };
    }
  }

  doNotify = (...args) => {
    const {onChange} = this.props;

    onChange(...args);
  };

  forceNotify = event => {
    if (!this.isDebouncing) {
      return;
    }

    if (this.cancel) {
      this.cancel();
    }

    const {value} = this.state;
    const {minLength} = this.props;

    if (value.length >= minLength) {
      this.doNotify(event);
    } else {
      this.doNotify({...event, target: {...event.target, value}});
    }
  };

  render() {

    return (
        <TextField 
          multiline 
          variant="outlined" 
          size="small" 
          label={this.state.label} 
          onChange={(e) =>{
            if (this.state.number === undefined || this.state.number === false){
              this.onChange(e);
            } else {
              if (!isNaN(e.target.value) || e.target.value === '-') this.onChange(e);
            }
          }} 
          value={this.state.value}
        />
    )

  }
}