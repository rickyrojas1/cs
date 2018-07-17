import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

class AutoFill extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: "",
      suggestions: []
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(
      this
    );
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(
      this
    );
    this.getSuggestions = this.getSuggestions.bind(this);
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    const languages = [
      {
        name: "C",
        year: 1972
      },
      {
        name: "Elm",
        year: 2012
      },
      {
        name: "Elk",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      },
      {
        name: "Elmked",
        year: 2012
      }
    ];

    return inputLength === 0
      ? []
      : languages.filter(
          lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  }

  onChange(event, { newValue }) {
    console.log("event :", event);
    console.log("this :", this);
    console.log("newValue :", newValue);
    this.setState({
      value: newValue
    });
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    });
  }

  render() {
    const { value, suggestions } = this.state;
    document.onkeydown = function(e) {
      console.log("e :", e);
    };
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Type a programming language",
      value,
      onChange: this.onChange
    };

    // Teach Autosuggest how to calculate suggestions for any given input value.

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    const getSuggestionValue = suggestion => suggestion.name;

    // Use your imagination to render suggestions.
    const renderSuggestion = suggestion => (
      <div className="coin-suggest">{suggestion.name}</div>
    );

    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}

export default AutoFill;
