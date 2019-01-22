import React from 'react'

class AddOption extends React.Component {

    state = {
        error: undefined
    }

    handleAddOption = (e) => {
        e.preventDefault()
        const option = e.target.elements.optionText.value.trim()
        const error = this.props.handleAddOption(option)

        this.setState(() => {
            return {
                error: error
            }
        })
        if (!error) {
            e.target.elements.optionText.value = ''
        }
    }

    render() {
        return (
            <div>
                {this.state.error && <p className="add-option-error">{this.state.error}</p>}
                <form className="add-option" onSubmit={this.handleAddOption}>
                    <input className="add-option__input" type="input" name="optionText" />
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}

export default AddOption