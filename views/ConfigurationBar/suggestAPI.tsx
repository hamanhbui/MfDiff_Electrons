import React = require("react");
import Autosuggest = require('react-autosuggest');
export class SuggestAPI extends React.Component<{ listAPI: string[], disabled: boolean }, { value?: string, suggestions?: any[] }> {
    constructor() {
        super();
        this.state = {
            value: '',
            suggestions: []
        };
    }
    escapeRegexCharacters(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    getSuggestions(value) {
        const escapedValue = this.escapeRegexCharacters(value.trim());
        return this.props.listAPI.filter(language => language.includes(escapedValue) ? language : undefined);
    }
    getSuggestionValue(suggestion) {
        return suggestion;
    }
    shouldRenderSuggestions() {
        return true;
    }
    renderSuggestion(suggestion) {
        return (
            <span>{suggestion}</span>
        );
    }
    onChange = (event, { newValue }) => {
        event;
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: "Your API key",
            value,
            onChange: this.onChange,
            disabled: this.props.disabled,
            style: {
                width: 130
            }
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                shouldRenderSuggestions={this.shouldRenderSuggestions}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />
        );
    }
}